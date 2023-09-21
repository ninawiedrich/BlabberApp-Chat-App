import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation}) => {
  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  // Determine text color based on background color
  const textColor = color === '#000000' || color === '#505050' ||  color === '#276757' ||  color ==='#9871EB' ? 'white' : 'black';

 return (
   <View style={[styles.container, { backgroundColor: color }]}>
     <Text style={{ color: textColor }}>Hello { name }!</Text> 
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});


export default Chat;
