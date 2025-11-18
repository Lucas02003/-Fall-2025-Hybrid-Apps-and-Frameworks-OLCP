import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
    })();
  }, []);

  const defaultRegion = {
    latitude: location ? location.latitude : 37.7749,
    longitude: location ? location.longitude : -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const restaurant = {
    title: "Nearby Restaurant",
    description: "A great place to eat!",
    latitude: defaultRegion.latitude + 0.0005,
    longitude: defaultRegion.longitude + 0.0005,
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={defaultRegion}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.title}
            description={restaurant.description}
          />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>
            {errorMsg ? errorMsg : "Fetching location..."}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 18 },
});

