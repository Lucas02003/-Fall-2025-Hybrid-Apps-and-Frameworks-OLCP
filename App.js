import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Animated,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Swipeable } from "react-native-gesture-handler";

// -----------------------------------------------------
// Reusable Animated Header Image (Expo-safe)
// -----------------------------------------------------
const HeaderImage = ({ uri }) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

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
// Reusable Swipeable List Item
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
// Characters Screen
// -----------------------------------------------------
function CharactersScreen() {
  const [data, setData] = useState([]);
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const headerUri =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Stormtroopers_Marching.jpg/640px-Stormtroopers_Marching.jpg";

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((r) => r.json())
      .then((d) => setData(d.results));
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <HeaderImage uri={headerUri} />

        {data.map((item) => (
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

      {/* Modal */}
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
// Planets Screen
// -----------------------------------------------------
function PlanetsScreen() {
  const [data, setData] = useState([]);
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const headerUri =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ESO_-_Milky_Way.jpg/640px-ESO_-_Milky_Way.jpg";

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((r) => r.json())
      .then((d) => setData(d.results));
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <HeaderImage uri={headerUri} />

        {data.map((item) => (
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
// Starships Screen
// -----------------------------------------------------
function StarshipsScreen() {
  const [data, setData] = useState([]);
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const headerUri =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/X-Wing_Fighter_model.jpg/640px-X-Wing_Fighter_model.jpg";

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((r) => r.json())
      .then((d) => setData(d.results));
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <HeaderImage uri={headerUri} />

        {data.map((item) => (
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
// Navigation Setup
// -----------------------------------------------------
const Tab = createBottomTabNavigator();

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






