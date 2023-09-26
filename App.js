import { useEffect } from "react";

import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyDJ5BBalVDQ84R0v_1QgBJRf5L7sC_QBg8",
    authDomain: "blabberapp-b085b.firebaseapp.com",
    projectId: "blabberapp-b085b",
    storageBucket: "blabberapp-b085b.appspot.com",
    messagingSenderId: "79008936575",
    appId: "1:79008936575:web:a5bbfe8e46780b08cf054a",
    measurementId: "G-SXK08H6YMV"
  };

      // initialize Firebase and Firebase Storage handlers
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

        // define state for connection status 
  const connectionStatus = useNetInfo();

  // check connection status and disable/enable network accordingly
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
            <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db} isConnected={connectionStatus.isConnected} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;