import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const weatherOptions = {
  Clear: {
    iconWeather: "weather-sunny",
    gradiant: ["#6ECBF9", "#41A6E0"],
    title: "Ochiq havo ",
  },
  Clouds: {
    iconWeather: "weather-rainy",
    gradiant: ["#63625E", "#E7E5DE"],
    title: "Bulut",
  },
  Rain: {
    iconWeather: "weather-rainy",
    gradiant: ["#454441", "#E7E5DE"],
    title: "Yomg'ir",
  },
  Snow: {
    iconWeather: "snowflake",
    gradiant: ["#E7E5DE", "#63625E"],
    title: "Qor",
  },
};

export default function Weather({ name, temp, condition, searchWeather }) {
  const [query, setQuery] = useState(" ");

  return (
    <LinearGradient
      colors={weatherOptions[condition].gradiant}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} />
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconWeather}
          size={96}
          color={"white"}
        />
      </View>
      <View style={styles.middle}>
        <Text style={styles.temp}>{temp} °C</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="salom"
          style={styles.inputs}
        />
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => searchWeather(query, setQuery)}
        >
          <Text style={styles.btnText}>Qidirmoq</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  middle: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  temp: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 10,
  },
  name: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
  },
  title: {
    color: "white",
    fontWeight: "500",
  },
  inputBox: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    color: "black",
  },

  inputs: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnSearch: {
    backgroundColor: "#046CB5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
