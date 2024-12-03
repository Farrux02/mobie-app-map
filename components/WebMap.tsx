import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const WebMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startCoordinate: [number, number] = [
      69.28600505492514, 41.34257828498218,
    ];
    const endCoordinate: [number, number] = [
      69.28414140099461, 41.33248945671928,
    ];
    const centerCoordinate: [number, number] = [
      (startCoordinate[0] + endCoordinate[0]) / 2,
      (startCoordinate[1] + endCoordinate[1]) / 2,
    ];

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=6MfAFzHuPxYDHgdMtAOA",
      center: centerCoordinate,
      zoom: 14,
    });

    new maplibregl.Marker({ color: "green" })
      .setLngLat(startCoordinate)
      .addTo(map);

    new maplibregl.Marker({ color: "red" }).setLngLat(endCoordinate).addTo(map);

    const route = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [startCoordinate, endCoordinate],
      },
      properties: {},
    };

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: route,
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#0000FF",
          "line-width": 3,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={mapContainerRef} />
  );
};

export default WebMap;
