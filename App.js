import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";

import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* =====================================================
ANIMATED HEADER IMAGE
===================================================== */
const HeaderImage = ({ uri }) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [uri]);

  return (
    <View style={styles.headerContainer}>
      <Animated.Image
        source={{ uri }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          opacity: fade,
        }}
      />
    </View>
  );
};

/* =====================================================
SEARCH BAR
===================================================== */
const SearchBar = ({ value, onChange }) => (
  <View style={styles.searchBox}>
    <TextInput
      placeholder="Search..."
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChange}
      style={styles.searchInput}
      autoCorrect={false}
      autoCapitalize="none"
      clearButtonMode="while-editing"
    />
  </View>
);

/* =====================================================
SWIPE ITEM
===================================================== */
const SwipeableItem = ({ item, onOpen }) => {
  const renderRight = () => (
    <Pressable style={styles.swipeBox} onPress={() => onOpen(item)}>
      <Text style={styles.swipeText}>Open</Text>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRight}>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          {item.name || item.title}
        </Text>
      </View>
    </Swipeable>
  );
};

/* =====================================================
REUSABLE DATA SCREEN (WITH SEARCH FILTERING)
===================================================== */
function DataScreen({ url, headerUri, onItemOpen }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.results || []))
      .catch(console.error);
  }, [url]);

  const filtered = data.filter((item) =>
    (item.name || item.title)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <HeaderImage uri={headerUri} />
      <SearchBar value={search} onChange={setSearch} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name || item.title}
        renderItem={({ item }) => (
          <SwipeableItem
            item={item}
            onOpen={
              onItemOpen
                ? onItemOpen
                : (it) => {
                    setModalText(it.name || it.title);
                    setModalVisible(true);
                  }
            }
          />
        )}
      />

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

/* =====================================================
PLANET DETAIL SCREEN
===================================================== */
function PlanetDetailScreen({ route }) {
  const { planet } = route.params;

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{planet.name}</Text>

        <View style={styles.detailCard}>
          {Object.entries(planet).map(([key, value]) =>
            typeof value === "string" ? (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{key}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ) : null
          )}
        </View>
      </View>
    </ScrollView>
  );
}

/* =====================================================
SCREENS
===================================================== */
const CharactersScreen = () => (
  <DataScreen
    url="https://swapi.dev/api/people/"
    headerUri="https://images.unsplash.com/photo-1579566346927-c68383817a25"
  />
);

const PlanetsListScreen = ({ navigation }) => (
  <DataScreen
    url="https://swapi.dev/api/planets/"
    headerUri="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
    onItemOpen={(item) =>
      navigation.navigate("PlanetDetail", { planet: item })
    }
  />
);

const StarshipsScreen = () => (
  <DataScreen
    url="https://swapi.dev/api/starships/"
    headerUri="https://images.unsplash.com/photo-1581093588401-12c1a39d757d"
  />
);

/* =====================================================
NAVIGATION
===================================================== */
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PlanetsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlanetsList" component={PlanetsListScreen} />
      <Stack.Screen name="PlanetDetail" component={PlanetDetailScreen} />
    </Stack.Navigator>
  );
}

/* =====================================================
APP ROOT
===================================================== */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Characters" component={CharactersScreen} />
          <Tab.Screen name="Planets" component={PlanetsStack} />
          <Tab.Screen name="Starships" component={StarshipsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/* =====================================================
STYLES
===================================================== */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#000" },
  headerContainer: { width: "100%", height: 220 },

  searchBox: { padding: 10 },
  searchInput: {
    backgroundColor: "#111",
    color: "white",
    padding: 12,
    borderRadius: 8,
  },

  listItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderColor: "#222",
  },

  listText: { color: "white", fontSize: 18 },

  swipeBox: {
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
  },

  swipeText: { color: "white", fontWeight: "bold" },

  modalCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 12,
  },

  modalTitle: { fontSize: 22, marginBottom: 16 },
  modalButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
  },

  modalButtonText: { color: "white", textAlign: "center" },

  detailContainer: { padding: 20 },
  detailTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  detailCard: {
    backgroundColor: "#111",
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },

  detailRow: { marginBottom: 12 },
  detailLabel: { color: "#aaa" },
  detailValue: { color: "white", fontSize: 18 },
});






