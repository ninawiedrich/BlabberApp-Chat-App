// Importing necessary modules and components
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

// Defining the Chat component
const Chat = ({route, navigation}) => {
  // Destructuring parameters from route
  const { name, color, background } = route.params;

  // State to hold messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending of new messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // Custom rendering of message bubbles
  const renderBubble = (props) => {
    // Determining the style of the bubble based on the selected background
    const wrapperStyle = background === "background1" ? {
      // Styles for background-chat-grey
      right: { backgroundColor: "#000000", borderWidth: 1, borderColor: "#FFFFFF" },
      left: { backgroundColor: "#505050", borderWidth: 1, borderColor: "#FFFFFF" }
    } : {
      // Styles for background-chat-green
      right: { backgroundColor: "#276757", borderWidth: 1, borderColor: "#FFFFFF" },
      left: { backgroundColor: "#50897A", borderWidth: 1, borderColor: "#FFFFFF" }
    };
    
    // Returning the Bubble component with custom styles
    return <Bubble {...props} wrapperStyle={wrapperStyle} textStyle={{ right: { color: '#FFFFFF' }, left: { color: '#FFFFFF' } }}/>;
  };

  // useEffect to initialize messages state
  useEffect(() => {
    setMessages([
      // Adding a user message and a system message
      { _id: 1, text: "Hello developer", createdAt: new Date(), user: { _id: 2, name: "React Native", avatar: "https://smallimg.pngkey.com/png/small/55-557320_yoda-circle-v-1459945140-star-wars-invitations-8ct.png" } },
      { _id: 2, text: 'This is a system message', createdAt: new Date(), system: true }
    ]);
  }, []);

  // useEffect to set the title of the navigation
  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  // Rendering the Chat component
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat messages={messages} renderBubble={renderBubble} onSend={messages => onSend(messages)} user={{ _id: 1 }}/>
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
}

const styles = StyleSheet.create({
 container: { flex: 1 }
});

export default Chat;
