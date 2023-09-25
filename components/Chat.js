import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, color, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

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

  useEffect(() => {
    navigation.setOptions({ title: name });

    const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(), // Convert Timestamp to Date
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default Chat;
