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
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  // initialize Firebase authentication
  const auth = getAuth();

  // enable anonymous authentication
  const userSignIn = () => {
    signInAnonymously(auth)
    // navigate to Chat screen with user data
      .then((result) => {
        if (result.user.uid) {
          navigation.navigate("Chat", {
            userID: result.user.uid,
            name: name,
            color: color,
            background: background,
          });
          Alert.alert("Signed in Successfully!");
        } else {
          Alert.alert("Something went wrong, try again!");
        }
      })
      .catch((error) => {
        Alert.alert("We could not sign you in. Try again later");
      });
  };

  const [name, setName] = useState("");
  const [color, setColor] = useState("#474056");
  const [background, setBackground] = useState("background1");

  const bgColors1 = {
    black: "#000000",
    darkGray: "#505050",
    white: "#FFFFFF",
    pink: "#FD77FF",
  };
  const bgColors2 = {
    darkGreen: "#276757",
    lightGreen: "#50897A",
    yellowGreen: "#90EE90",
    white: "#FFFFFF",
  };

  return (
    <ImageBackground
      source={
        background === "background1"
          ? require("../assets/background-chat-grey.jpg")
          : require("../assets/background-chat-green.jpg")
      }
      style={styles.container}
      accessible={true}
      accessibilityLabel="Background Image"
      accessibilityRole="image"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title} accessibilityRole="header">
          BlabberApp
        </Text>
        <TextInput
          style={styles.nameInput__input}
          value={name}
          onChangeText={setName}
          placeholder="Your username here"
          placeholderTextColor="#757083"
          backgroundColor="#fff"
          accessible={true}
          accessibilityLabel="Name input field"
          accessibilityHint="Enter your name here."
          accessibilityRole="text"
        />
        <View style={styles.backgroundSelect} accessible={true} accessibilityLabel="Background selection" accessibilityRole="menu">
          <Text style={styles.backgroundSelect__text}>
            Choose your background:
          </Text>
          <View style={styles.backgroundSelect__dotsWrapper}>
            <TouchableOpacity onPress={() => setBackground("background1")} accessible={true} accessibilityLabel="Background 1" accessibilityRole="menuitem">
              <Image
                source={require("../assets/background-chat-grey.jpg")}
                style={styles.backgroundSelect__dot}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBackground("background2")} accessible={true} accessibilityLabel="Background 2" accessibilityRole="menuitem">
              <Image
                source={require("../assets/background-chat-green.jpg")}
                style={styles.backgroundSelect__dot}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colorSelect} accessible={true} accessibilityLabel="Color selection" accessibilityRole="menu">
          <Text style={styles.backgroundSelect__text}>
            Choose your background color:
          </Text>
          <View style={styles.colorSelect__dotsWrapper}>
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                {
                  backgroundColor:
                    background === "background1"
                      ? bgColors1.black
                      : bgColors2.darkGreen,
                },
              ]}
              onPress={() =>
                setColor(
                  background === "background1"
                    ? bgColors1.black
                    : bgColors2.darkGreen
                )
              }
              accessible={true}
              accessibilityLabel="Color 1"
              accessibilityRole="menuitem"
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                {
                  backgroundColor:
                    background === "background1"
                      ? bgColors1.darkGray
                      : bgColors2.lightGreen,
                },
              ]}
              onPress={() =>
                setColor(
                  background === "background1"
                    ? bgColors1.darkGray
                    : bgColors2.lightGreen
                )
              }
              accessible={true}
              accessibilityLabel="Color 2"
              accessibilityRole="menuitem"
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                {
                  backgroundColor:
                    background === "background1"
                      ? bgColors1.white
                      : bgColors2.white,
                },
              ]}
              onPress={() =>
                setColor(
                  background === "background1"
                    ? bgColors1.white
                    : bgColors2.white
                )
              }
              accessible={true}
              accessibilityLabel="Color 3"
              accessibilityRole="menuitem"
            />
            <TouchableOpacity
              style={[
                styles.colorSelect__dot,
                {
                  backgroundColor:
                    background === "background1"
                      ? bgColors1.pink
                      : bgColors2.yellowGreen,
                },
              ]}
              onPress={() =>
                setColor(
                  background === "background1"
                    ? bgColors1.pink
                    : bgColors2.yellowGreen
                )
              }
              accessible={true}
              accessibilityLabel="Color 4"
              accessibilityRole="menuitem"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.fauxButton} onPress={userSignIn} accessible={true} accessibilityLabel="Start Chatting Button" accessibilityHint="Navigates to the chat screen." accessibilityRole="button">
          <Text style={styles.fauxButton__text}>Start Chatting</Text>
        </TouchableOpacity>
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </View>
    </ImageBackground>
  );
};

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
