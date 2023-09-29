import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  // get name, color and background data from Start component
  const { name, color, background, userID } = route.params;
  // set messages state
  const [messages, setMessages] = useState([]);

  // Set the navigation title to the user's name once the component is mounted
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Decklare variable to disable old listeners and avoid memory leaks
  let unsubMessages;

  // Send and store messages through Firestore database
  useEffect(() => {
    // If connected, fetch messages from Firestore and cache them
    if (isConnected === true) {
      // deregister current onSnapshot() listener to avoid registering multiple listeners
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // create a query that orders messages by creation date
      const dbQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(dbQuery, (documentsSnapshot) => {
        const messages = [];
        documentsSnapshot.forEach((document) => {
          messages.push({
            _id: document.id,
            ...document.data(),
            createdAt: new Date(document.data().createdAt.toMillis()),
            avatar: "https://placeimg.com/140/140/any",
          });
        });
        setMessages(messages);
        cacheUserMessages(messages); // Cache the fetched messages
      });
    } else {
      loadCachedMessages(); // Load cached messages if not connected
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // Function to cache user messages using AsyncStorage
  const cacheUserMessages = async (chatsToCache) => {
    try {
      await AsyncStorage.setItem("user_messages", JSON.stringify(chatsToCache));
    } catch (error) {
      Alert.alert("Error caching messages", error.message);
    }
  };

  // Function to load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages =
        (await AsyncStorage.getItem("user_messages")) || "[]";
      setMessages(JSON.parse(cachedMessages));
    } catch (error) {
      Alert.alert("Error loading cached messages", error.message);
    }
  };

  // Customize the appearance of chat bubbles
  const renderBubble = (props) => {
    const wrapperStyle =
      background === "background1"
        ? {
            right: {
              backgroundColor: "#000000",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            },
            left: {
              backgroundColor: "#505050",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            },
          }
        : {
            right: {
              backgroundColor: "#276757",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            },
            left: {
              backgroundColor: "#50897A",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            },
          };
    return (
      <Bubble
        {...props}
        wrapperStyle={wrapperStyle}
        textStyle={{ right: { color: "#FFFFFF" }, left: { color: "#FFFFFF" } }}
        accessible={true}
        accessibilityLabel="Chat bubble"
        accessibilityHint="Displays the message in a bubble."
        accessibilityRole="text"
      />
    );
  };

  // Customize the appearance of the action button
  const renderCustomActions = (props) => {
    return <CustomActions 
    storage={storage} userID={userID} {...props}
    accessible={true}
    accessibilityLabel="Custom actions button"
    accessibilityHint="Allows you to choose additional actions."
    accessibilityRole="button" />;
  };

  // Render InputToolbar based on connection status
  const renderInputToolbar = (props) => {
    if (isConnected === true) {
      return <InputToolbar 
      {...props}
      accessible={true}
      accessibilityLabel="Message input toolbar"
      accessibilityHint="Allows you to write and send messages."
      accessibilityRole="keyboardkey" />;
    } else return null;
  };

  // Function to handle sending of new messages and adding them to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          accessible={true}
          accessibilityLabel="Map view"
          accessibilityHint="Displays the location on the map."
          accessibilityRole="image"
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        user={{ _id: userID, name: name }}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        placeholder="Type your message here..."
        accesible = {true}
        accessibilityLabel="Chat input"
        accessibilityHint="Displays the chat messages."
        accessibilityRole="text"
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
