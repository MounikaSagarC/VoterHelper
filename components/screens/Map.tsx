import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// 1. Import UrlTile along with MapView
import * as Location from "expo-location";
import MapView, { Marker, Region, UrlTile } from "react-native-maps";

export default function FreeMap() {
  const [location, setLocation] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            // 2. CRITICAL: Remove the default provider (Google) to use OSM tiles
            provider={undefined}
          >
            {/* 3. Add the OpenStreetMap Tile Layer */}
            <UrlTile
              // CartoDB Voyager tiles (clean, Google-like look)
              urlTemplate="https://{s}://{z}/{x}/{y}{r}.png"
              maximumZ={19}
              flipY={false}
              // This helps identify your app to the provider
            //   userAgent="MyMobileApp/1.0"
            />
            <Marker coordinate={location} title="You are here" />
          </MapView>
        ) : (
          <View style={[styles.map, styles.loading]}>
            <Text>{errorMsg || "Loading Free Map..."}</Text>
          </View>
        )}
      </View>

      <View style={styles.form}>{/* Your form items here */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { height: 200, width: "100%" },
  map: { flex: 1 },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  form: { padding: 20 },
});
