
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
npm install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated

import * as React from 'react';
import { Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screen Components
function PlanetsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Planets Screen</Text>
    </View>
  );
}

function FilmsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Films Screen</Text>
    </View>
  );
}

function SpaceshipsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Spaceships Screen</Text>
    </View>
  );
}

// Navigation setup
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

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Tabs /> : <Drawers />}
    </NavigationContainer>
  );
}
