import * as React from 'react';
import { Text, View, Platform, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// ---------------------------
// Screens With API Fetching
// ---------------------------

// PLANETS
function PlanetsScreen() {
  const [planets, setPlanets] = React.useState([]);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
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

// FILMS
function FilmsScreen() {
  const [films, setFilms] = React.useState([]);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then(res => res.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
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

// SPACESHIPS (STARSHIPS)
function SpaceshipsScreen() {
  const [ships, setShips] = React.useState([]);

  React.useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
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

// ---------------------------
// Navigation Setup
// ---------------------------

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

// ---------------------------
// Main App
// ---------------------------

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Tabs /> : <Drawers />}
    </NavigationContainer>
  );
}

// ---------------------------
// Styles
// ---------------------------

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
});


