import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, route, navigation, isConnected }) => {
  const { name, color, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Set the navigation title to the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  let unsubMessages;

  // Handle real-time connection and fetch messages accordingly
  useEffect(() => {
    // If connected, fetch messages from Firestore and cache them
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      
      const dbQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(dbQuery, (documentsSnapshot) => {
        const messages = [];
        documentsSnapshot.forEach((document) => {
          messages.push({
            _id: document.id,
            ...document.data(),
            createdAt: new Date(document.data().createdAt.toMillis()),
            avatar: "https://placeimg.com/140/140/any"
          })
        })
        setMessages(messages);
        cacheUserMessages(messages); // Cache the fetched messages
      });
    } else {
      loadCachedMessages(); // Load cached messages if not connected
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  // Function to cache user messages using AsyncStorage
  const cacheUserMessages = async (chatsToCache) => {
    try {
      await AsyncStorage.setItem("user_messages", JSON.stringify(chatsToCache));
    } catch (error) {
      Alert.alert("Error caching messages", error.message);
    }
  }

  // Function to load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("user_messages") || "[]";
      setMessages(JSON.parse(cachedMessages));
    } catch (error) {
      Alert.alert("Error loading cached messages", error.message);
    }
  }

  // Customize the appearance of chat bubbles
  const renderBubble = (props) => {
    const wrapperStyle = background === "background1" ? {
      right: { backgroundColor: "#000000", borderWidth: 1, borderColor: "#FFFFFF" },
      left: { backgroundColor: "#505050", borderWidth: 1, borderColor: "#FFFFFF" }
    } : {
      right: { backgroundColor: "#276757", borderWidth: 1, borderColor: "#FFFFFF" },
      left: { backgroundColor: "#50897A", borderWidth: 1, borderColor: "#FFFFFF" }
    };
    return <Bubble {...props} wrapperStyle={wrapperStyle} textStyle={{ right: { color: '#FFFFFF' }, left: { color: '#FFFFFF' } }} />;
  };

  // Render InputToolbar based on connection status
  const renderInputToolbar = (props) => {
    if (isConnected === true) {
      return <InputToolbar {...props} />
    } else return null;
  }

  // Function to handle sending of new messages and adding them to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        user={{ _id: userID, name: name }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
