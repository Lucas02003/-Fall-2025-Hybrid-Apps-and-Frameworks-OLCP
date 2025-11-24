import * as React from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Animated,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Swipeable } from 'react-native-gesture-handler';

/* ---------------------------------------------------
   REUSABLE ANIMATED SWIPEABLE LIST ITEM (Chapter 25)
------------------------------------------------------ */
function SwipeItem({ text, onSwipe }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Swipeable onSwipeableRightOpen={() => onSwipe(text)}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.listItem}>{text}</Text>
      </Animated.View>
    </Swipeable>
  );
}

/* ---------------------------------------
   PLANETS SCREEN
------------------------------------------ */
function PlanetsScreen() {
  const [planets, setPlanets] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  React.useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  const openItem = (name) => {
    setSelectedItem(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search planets…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedItem}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {planets.map((item) => (
          <SwipeItem
            key={item.name}
            text={item.name}
            onSwipe={openItem}
          />
        ))}
      </ScrollView>

    </View>
  );
}

/* ---------------------------------------
   FILMS SCREEN
------------------------------------------ */
function FilmsScreen() {
  const [films, setFilms] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  React.useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then(res => res.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, []);

  const openItem = (title) => {
    setSelectedItem(title);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search films…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedItem}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {films.map((item) => (
          <SwipeItem
            key={item.title}
            text={item.title}
            onSwipe={openItem}
          />
        ))}
      </ScrollView>

    </View>
  );
}

/* ---------------------------------------
   SPACESHIPS SCREEN
------------------------------------------ */
function SpaceshipsScreen() {
  const [ships, setShips] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  React.useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results))
      .catch(err => console.error(err));
  }, []);

  const openItem = (name) => {
    setSelectedItem(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search spaceships…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{selectedItem}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {ships.map((item) => (
          <SwipeItem
            key={item.name}
            text={item.name}
            onSwipe={openItem}
          />
        ))}
      </ScrollView>

    </View>
  );
}

/* ---------------------------------------
   NAVIGATION SETUP
------------------------------------------ */
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Tab.Navigator>
  );
}

function Drawers() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Planets" component={PlanetsScreen} />
      <Drawer.Screen name="Films" component={FilmsScreen} />
      <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Drawer.Navigator>
  );
}

/* ---------------------------------------
   MAIN APP
------------------------------------------ */
export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Tabs /> : <Drawers />}
    </NavigationContainer>
  );
}

/* ---------------------------------------
   STYLES
------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  listItem: {
    fontSize: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white"
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});




