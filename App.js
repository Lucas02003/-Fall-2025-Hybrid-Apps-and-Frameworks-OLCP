import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  TextInput,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Swipeable } from "react-native-gesture-handler";

// -----------------------------------------------------
// Network Hook
// -----------------------------------------------------
function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
}

// -----------------------------------------------------
// Animated Header Image (ESLint Safe)
// -----------------------------------------------------
const HeaderImage = ({ uri }) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <Animated.View style={{ opacity: fade }}>
      <View style={styles.headerContainer}>
        <Image
          source={uri}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={500}
        />
      </View>
    </Animated.View>
  );
};

// -----------------------------------------------------
// Search Bar
// -----------------------------------------------------
const SearchBar = ({ value, onChange }) => (
  <View style={styles.searchBox}>
    <TextInput
      placeholder="Search..."
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChange}
      style={styles.searchInput}
    />
  </View>
);

// -----------------------------------------------------
// Swipeable Item
// -----------------------------------------------------
const SwipeableItem = ({ text, onSwipe }) => {
  const renderRight = () => (
    <View style={styles.swipeBox}>
      <Text style={styles.swipeText}>Open</Text>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRight} onSwipeableOpen={onSwipe}>
      <View style={styles.listItem}>
        <Text style={styles.listText}>{text}</Text>
      </View>
    </Swipeable>
  );
};

// -----------------------------------------------------
// Reusable Data Screen (ESLint Safe)
// -----------------------------------------------------
function DataScreen({ url, headerUri }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) return;

    fetch(url)
      .then((r) => r.json())
      .then((d) => setData(d.results))
      .catch(console.error);
  }, [isOnline, url]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOnline) {
    return (
      <View style={styles.offlineBox}>
        <Text style={styles.offlineText}>
          ⚠️ No internet connection. Please check your network.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <HeaderImage uri={headerUri} />
        <SearchBar value={search} onChange={setSearch} />

        {filteredData.map((item) => (
          <SwipeableItem
            key={item.name}
            text={item.name}
            onSwipe={() => {
              setModalText(item.name);
              setModalVisible(true);
            }}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalCenter}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modalText}</Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// -----------------------------------------------------
// Screens
// -----------------------------------------------------
const CharactersScreen = () => (
  <DataScreen
    url="https://swapi.dev/api/people/"
    headerUri="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Stormtroopers_Marching.jpg/640px-Stormtroopers_Marching.jpg"
  />
);

const PlanetsScreen = () => (
  <DataScreen
    url="https://swapi.dev/api/planets/"
    headerUri="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ESO_-_Milky_Way.jpg/640px-ESO_-_Milky_Way.jpg"
  />
);

const StarshipsScreen = () => (
  <DataScreen
    url="https://swapi.dev/api/starships/"
    headerUri="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/X-Wing_Fighter_model.jpg/640px-X-Wing_Fighter_model.jpg"
  />
);

// -----------------------------------------------------
// Navigation Setup
// -----------------------------------------------------
const Tab = createBottomTabNavigator();

// ✅ ✅ ✅ DEFAULT EXPORT (FIXES "No default export" ERROR)
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Characters" component={CharactersScreen} />
        <Tab.Screen name="Planets" component={PlanetsScreen} />
        <Tab.Screen name="Starships" component={StarshipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// -----------------------------------------------------
// Styles
// -----------------------------------------------------
const styles = StyleSheet.create({
  screen: { flex: 1 },

  headerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },

  searchBox: {
    padding: 10,
    backgroundColor: "#000",
  },

  searchInput: {
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },

  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#444",
    backgroundColor: "#111",
  },

  listText: {
    color: "white",
    fontSize: 18,
  },

  swipeBox: {
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },

  swipeText: {
    color: "white",
    fontWeight: "bold",
  },

  modalCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  modalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#333",
    borderRadius: 8,
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
  },

  offlineBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  offlineText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
});

// -----------------------------------------------------
// Styles
// -----------------------------------------------------
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#444",
    backgroundColor: "#111",
  },
  listText: {
    color: "white",
    fontSize: 18,
  },
  swipeBox: {
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  swipeText: {
    color: "white",
    fontWeight: "bold",
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});







