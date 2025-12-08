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

import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* =====================================================

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
    <Swipeable
      renderRightActions={renderRight}
      onSwipeableOpen={() => onOpen(item)}
    >
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          {item.name || item.title}
        </Text>
      </View>
    </Swipeable>
  );
};

/* =====================================================
REUSABLE DATA SCREEN (NO NETINFO — SNACK SAFE)
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
      <ScrollView>
        <HeaderImage uri={headerUri} />
        <SearchBar value={search} onChange={setSearch} />

        {filtered.map((item) => (
          <SwipeableItem
            key={item.name || item.title}
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







