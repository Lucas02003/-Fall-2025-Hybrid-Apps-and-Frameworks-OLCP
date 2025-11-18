import * as React from 'react';
import {
  Text,
  View,
  Platform,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// -----------------------------------------------------
// PLANETS SCREEN
// -----------------------------------------------------
function PlanetsScreen() {
  const [planets, setPlanets] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search planets…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <Button title="Submit" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You entered: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
      />
    </View>
  );
}

// -----------------------------------------------------
// FILMS SCREEN
// -----------------------------------------------------
function FilmsScreen() {
  const [films, setFilms] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then(res => res.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search films…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <Button title="Submit" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You entered: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.title}</Text>
        )}
      />
    </View>
  );
}

// -----------------------------------------------------
// SPACESHIPS SCREEN
// -----------------------------------------------------
function SpaceshipsScreen() {
  const [ships, setShips] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search spaceships…"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <Button title="Submit" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You entered: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={ships}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
      />
    </View>
  );
}

// -----------------------------------------------------
// NAVIGATION SETUP
// -----------------------------------------------------
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

// -----------------------------------------------------
// MAIN APP
// -----------------------------------------------------
export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Tabs /> : <Drawers />}
    </NavigationContainer>
  );
}

// -----------------------------------------------------
// STYLES
// -----------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  listItem: {
    fontSize: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
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


