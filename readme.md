# BlabberApp: React Native Mobile Chat App

BlabberApp is a vibrant and user-friendly mobile chat application designed to provide a seamless communication experience. It allows users to engage in lively conversations, share images and locations, and enjoy a rich, interactive interface. Developed with React Native and integrated with Google Firestore Database, BlabberApp is optimized for both Android and iOS, offering real-time chat functionalities and offline message access, making it a versatile tool for staying connected anytime, anywhere.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Run the App](#run-the-app)
- [Contributions](#contributions)
- [Feedback](#feedback)
- [Acknowledgements](#acknowledgements)

## Features
- **User Authentication:** Anonymous authentication via Google Firebase.
- **Chat Interface:** A user-friendly interface for sending messages, images, and location data.
- **Data Storage:** Conversations are stored in Google Firestore Database and locally for offline access.
- **Image Sharing:** Users can pick and send images from the phone’s image library and take pictures with the device’s camera app.
- **Location Sharing:** Users can share their current location in a map view.
- **Accessibility:** The app is compatible with screen readers for users with visual impairments.

## Technologies Used
- React Native
- Expo
- Google Firestore DB
- Firebase Cloud Storage
- React Native Gifted Chat Library
- AsyncStorage for offline caching
- Expo ImagePicker & MediaLibrary

## Setup and Installation
1. **Development Environment:**
   - Install [Expo CLI](https://expo.dev/): `npm install -g expo-cli`
   - Set up [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) for Android emulation.

2. **Database Configuration:**
   - Create a new project in [Firebase Console](https://console.firebase.google.com/).
   - Configure Firestore Database and Firebase Authentication.
   - Replace the Firebase configuration in the project with your Firebase project credentials.

3. **Dependencies Installation:**
   To install the necessary dependencies, run the following commands:
   ```sh
   npm install @react-native-async-storage/async-storage
   npm install @react-native-community/netinfo
   npm install @react-navigation/native
   npm install @react-navigation/native-stack
   npm install expo
   npm install firebase
   npm install react-native
   npm install react-native-gifted-chat
   npm install react-native-safe-area-context
   npm install react-native-screens
   npm install expo-image-picker
   npm install expo-location
   npm install react-native-maps

## Usage
To use BlabberApp, follow the steps below:
1. **Start the App:**
   - Run `npx expo start` to start the app.
   - Enter your name and choose a background color for the chat screen.

2. **Join the Chat Room:**
   - Once you've entered your name and chosen a background color, you can join the chat room and start chatting with other users.

3. **Send Messages:**
   - Use the input field to type your message.
   - Press the 'Send' button to send your message to the chat room.

4. **Send Images:**
   - You can either choose an image from your device's library or take a new picture with your device’s camera app.
   - Once you've selected an image, press 'Send' to share it in the chat room.

5. **Share Your Location:**
   - Press the 'Location' button to share your current location with other users in the chat room.

6. **Read Messages Offline:**
   - You can read your messages offline and reread conversations at any time.

7. **Accessibility:**
   - BlabberApp is compatible with screen readers for users with visual impairments.

## Contributions
Contributions to BlabberApp are always welcome. If you have any suggestions, improvements, or bug fixes, please feel free to submit a pull request.

## Feedback
If you have any feedback or inquiries, please reach out to [Your Email](mailto:nina.wiedrich@gmail.com).

## Acknowledgements
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
