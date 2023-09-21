import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";

const Start = ({ navigation }) => {
  // State variables to hold user input and selected options
  const [name, setName] = useState("");
  const [color, setColor] = useState("#474056");
  const [background, setBackground] = useState("background1");

  // Define color palettes for two different backgrounds
  const bgColors1 = {
    black: "#000000",
    darkGray: "#505050",
    purple: "#9871EB",
    pink: "#FD77FF",
  };
  const bgColors2 = {
    darkGreen: "#276757",
    lightGreen: "#50897A",
    yellowOrange: "#FFC966",
    yellowGreen: "#90EE90",
  };

  return (
    <ImageBackground
      // Dynamically set the background image based on user selection
      source={
        background === "background1"
          ? require("../assets/background-chat-grey.jpg")
          : require("../assets/background-chat-green.jpg")
      }
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>BlabberApp</Text>
        <TextInput
          style={styles.nameInput__input}
          value={name}
          onChangeText={setName}
          placeholder="Your username here"
          placeholderTextColor="#757083"
          backgroundColor="#fff"
        />
        {/* Section for selecting background */}
        <View style={styles.backgroundSelect}>
          <Text style={styles.backgroundSelect__text}>
            Choose your background:
          </Text>
          <View style={styles.backgroundSelect__dotsWrapper}>
            <TouchableOpacity onPress={() => setBackground("background1")}>
              <Image
                source={require("../assets/background-chat-grey.jpg")}
                style={styles.backgroundSelect__dot}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBackground("background2")}>
              <Image
                source={require("../assets/background-chat-green.jpg")}
                style={styles.backgroundSelect__dot}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Section for selecting color */}
        <View style={styles.colorSelect}>
          <Text style={styles.backgroundSelect__text}>
            Choose your background color:
          </Text>
          <View style={styles.colorSelect__dotsWrapper}>
            {/* Rendering color dots and setting color on press */}
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                { backgroundColor: background === "background1" ? bgColors1.black : bgColors2.darkGreen },
              ]}
              onPress={() => setColor(background === "background1" ? bgColors1.black : bgColors2.darkGreen)}
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                { backgroundColor: background === "background1" ? bgColors1.darkGray : bgColors2.lightGreen },
              ]}
              onPress={() => setColor(background === "background1" ? bgColors1.darkGray : bgColors2.lightGreen)}
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                { backgroundColor: background === "background1" ? bgColors1.purple : bgColors2.yellowOrange },
              ]}
              onPress={() => setColor(background === "background1" ? bgColors1.purple : bgColors2.yellowOrange)}
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                { backgroundColor: background === "background1" ? bgColors1.pink : bgColors2.yellowGreen },
              ]}
              onPress={() => setColor(background === "background1" ? bgColors1.pink : bgColors2.yellowGreen)}
            />
          </View>
        </View>
        {/* Start Chatting Button */}
        <TouchableOpacity
          style={styles.fauxButton}
          onPress={() => {
            if (name) {
              navigation.navigate("Chat", { name, color });
            } else {
              Alert.alert("Username is required!");
            }
          }}
        >
          <Text style={[styles.colorSelect__text, styles.fauxButton__text]}>
            Start Chatting
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", 
    alignItems: "center",
    paddingBottom: 50, 
  },
  innerContainer: {
    width: "88%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    textShadowColor: "black", 
    textShadowOffset: { width: -5, height: 5 },
    textShadowRadius: 1,
    marginBottom: 20,
  },
  backgroundSelect__text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  nameInput__input: {
    height: 50,
    width: "100%",
    borderColor: "#757083",
    borderWidth: 1,
    paddingLeft: 20,
    marginBottom: 20,
  },
  colorSelect: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  colorSelect__dotsWrapper: {
    flexDirection: "row",
    marginTop: 10, 
  },
  colorSelect__dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  fauxButton: {
    backgroundColor: "#000000",
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  fauxButton__text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backgroundSelect: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backgroundSelect__dotsWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  backgroundSelect__dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default Start;
