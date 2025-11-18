'use client';

import React, { useMemo, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Coordinate } from "@/types";

const TARGET_CITY_CENTER: Coordinate = {
  lat: 10.9685,
  lng: -74.7813
};

const DEFAULT_ZOOM = 12;

const generateSimulatedMarkers = (
  count: number,
  center: Coordinate
): google.maps.LatLngLiteral[] => {

  const markers: google.maps.LatLngLiteral[] = [];

  for (let i = 0; i < count; i++) {
    markers.push({
      lat: center.lat + (Math.random() - 0.5) * 0.1,
      lng: center.lng + (Math.random() - 0.5) * 0.1,
    });
  }

  return markers;
};

const MapComponent: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Bus icon state (created only after Google Maps is loaded)
  const [busIcon, setBusIcon] = useState<google.maps.Icon | null>(null);

  // User geolocation
  const { position: userPosition, loading, error } = useGeolocation();
  const mapCenter = userPosition || TARGET_CITY_CENTER;

  // Map options
  const mapOptions: google.maps.MapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
    }),
    []
  );

  // Simulated markers
  const simulatedMarkers = useMemo(
    () => generateSimulatedMarkers(10, TARGET_CITY_CENTER),
    []
  );

  // Create icon ONLY when Google Maps is loaded
  const handleMapLoad = () => {
    setBusIcon({
      url: "/bus-icon.svg", 
      scaledSize: new window.google.maps.Size(35, 35),
    });
  };

  if (!apiKey) {
    return (
      <div className="p-4 text-red-500">
        Error: Google Maps API key is not configured.
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">

      {/* Status messages */}
      {loading && (
        <div className="absolute top-4 left-4 z-10 p-2 bg-yellow-100 rounded shadow-md">
          Getting your current location...
        </div>
      )}
      {error && (
        <div className="absolute top-4 left-4 z-10 p-2 bg-red-100 text-red-700 rounded shadow-md">
          Geolocation Error: {error}
        </div>
      )}

      <LoadScript googleMapsApiKey={apiKey} libraries={["geometry"]}>
        <GoogleMap
          center={mapCenter}
          zoom={DEFAULT_ZOOM}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={mapOptions}
          onLoad={handleMapLoad}
        >
          {/* User location marker */}
          {userPosition && (
            <Marker
              position={userPosition}
              title="Your current location"
            />
          )}

          {/* Simulated bus markers */}
          {simulatedMarkers.map((pos, index) => (
            <Marker
              key={`bus-${index}`}
              position={pos}
              icon={busIcon || undefined}
            />
          ))}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
