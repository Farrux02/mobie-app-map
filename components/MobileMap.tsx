import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import 'react-native-get-random-values';

MapLibreGL.setAccessToken(null);

const MobileMap: React.FC = () => {
  const startCoordinate: [number, number] = [69.28600505492514, 41.34257828498218];
  const endCoordinate: [number, number] = [69.28414140099461, 41.33248945671928];
  const centerCoordinate: [number, number] = [
    (startCoordinate[0] + endCoordinate[0]) / 2,
    (startCoordinate[1] + endCoordinate[1]) / 2,
  ];

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        styleURL="https://api.maptiler.com/maps/streets/style.json?key=6MfAFzHuPxYDHgdMtAOA"
      >
        <MapLibreGL.Camera
          zoomLevel={14}
          centerCoordinate={centerCoordinate}
        />

        <MapLibreGL.PointAnnotation
          id="start"
          coordinate={startCoordinate}
        >
          <View style={styles.annotationContainer}>
            <View style={[styles.annotationFill, { backgroundColor: 'green' }]} />
          </View>
        </MapLibreGL.PointAnnotation>

        <MapLibreGL.PointAnnotation
          id="end"
          coordinate={endCoordinate}
        >
          <View style={styles.annotationContainer}>
            <View style={[styles.annotationFill, { backgroundColor: 'red' }]} />
          </View>
        </MapLibreGL.PointAnnotation>

        <MapLibreGL.ShapeSource
          id="routeSource"
          shape={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [startCoordinate, endCoordinate],
            },
          }}
        >
          <MapLibreGL.LineLayer
            id="routeFill"
            style={{ lineColor: '#0000FF', lineWidth: 3 }}
          />
        </MapLibreGL.ShapeSource>
      </MapLibreGL.MapView>
    </View>
  );
};

export default MobileMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
