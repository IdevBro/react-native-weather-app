import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Weather from "./components/Weather";

import axios from "axios";

import { Alert, StyleSheet } from "react-native";

import * as Location from "expo-location";

const KEY = "1b70d5a3d8f7548af6551bc567d1ab55";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loc, setLoc] = useState(null);

  const getWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`
      );
      setLoc(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data for your location.");
      setIsLoading(false);
    }
  };

  const searchWeather = async (query) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${KEY}&units=metric`
      );
      setLoc(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Iltimos shahar nomini to'g'ri yozing!", [
        { text: "OK", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
    } catch (err) {
      Alert.alert("Sorry I can't find your current location! :(");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      searchWeather={searchWeather}
      temp={Math.round(loc.main.temp)}
      name={loc.name}
      condition={loc.weather[0].main}
    />
  );
}

const styles = StyleSheet.create({});
