import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import "react-native-get-random-values";
// import * as Location from "expo-location";

MapLibreGL.setAccessToken(null);

const App: React.FC = () => {
  // const [location, setLocation] = useState<number[] | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Доступ к геолокации запрещен");
  //       return;
  //     }

  //     let loc = await Location.getCurrentPositionAsync({});
  //     setLocation([loc.coords.longitude, loc.coords.latitude]);
  //   })();
  // }, []);

  // if (!location) {
  //   return (
  //     <View style={styles.container}>
  //       <MapLibreGL.MapView style={styles.map} />
  //     </View>
  //   );
  // }

  const startCoordinate: [number, number] = [
    69.28600505492514, 41.34257828498218,
  ];
  const endCoordinate: [number, number] = [
    69.28414140099461, 41.33248945671928,
  ];

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        styleURL="https://api.maptiler.com/maps/streets/style.json?key=6MfAFzHuPxYDHgdMtAOA"
        localizeLabels
      >
        {/* <MapLibreGL.Camera zoomLevel={14} centerCoordinate={location} /> */}
        <MapLibreGL.Camera
          zoomLevel={14}
          centerCoordinate={[69.285292, 41.339992, 69.282683, 41.325946]}
        />
        {/* Отображение индикатора местоположения пользователя */}
        <MapLibreGL.UserLocation visible={true} androidRenderMode="normal" />
        <MapLibreGL.PointAnnotation id="start" coordinate={startCoordinate}>
          <View style={styles.annotationContainer}>
            <View
              style={[styles.annotationFill, { backgroundColor: "green" }]}
            />
          </View>
        </MapLibreGL.PointAnnotation>

        {/* Маркер конца маршрута */}
        <MapLibreGL.PointAnnotation id="end" coordinate={endCoordinate}>
          <View style={styles.annotationContainer}>
            <View style={[styles.annotationFill, { backgroundColor: "red" }]} />
          </View>
        </MapLibreGL.PointAnnotation>

        {/* Отображение маршрута */}
        <MapLibreGL.ShapeSource
          id="routeSource"
          shape={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [startCoordinate, endCoordinate],
            },
          }}
        >
          <MapLibreGL.LineLayer
            id="routeFill"
            style={{ lineColor: "#00f", lineWidth: 3 }}
          />
        </MapLibreGL.ShapeSource>
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    transform: [{ scale: 0.6 }],
  },
});
export default App;
