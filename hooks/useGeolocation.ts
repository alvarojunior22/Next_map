import { useState, useCallback, useEffect } from "react";
import { GeocalationState } from "@/types";

export const useGeolocation = () => {
  const [state, setState] = useState<GeocalationState>({
    position: null,
    loading: true,
    error: null,
  });

  const handleError = useCallback((err: GeolocationPositionError) => {
    let errorMessage = "Error obtaining location";

    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = "Location permission denied";
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = "Location unavailable";
        break;
      case err.TIMEOUT:
        errorMessage = "Location request timeout";
        break;
    }

    setState({ position: null, loading: false, error: errorMessage });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Geolocation not supported",
      }));
      return;
    }

    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );

    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [handleError]);

  return state;
};
