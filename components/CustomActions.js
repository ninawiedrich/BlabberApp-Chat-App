import { TouchableOpacity, Alert, StyleSheet, View, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, userID, storage, onSend }) => {
  const actionSheet = useActionSheet();

  // Function to handle the action press and show the action sheet
  const onActionPress = () => {
    const options = ["choose from Library", "Take photo", "send Location", "cancel"];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions({ options, cancelButtonIndex }, async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          pickImage();
          return;
        case 1:
          takePhoto();
          return;
        case 2:
          getLocation();
          return;
        default:
      }
    });
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendPic(result.assets[0].uri);
      else Alert.alert("Permission denied");
    }
  };

  // Function to take a photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendPic(result.assets[0].uri);
      else Alert.alert("Permission denied");
    }
  };

  // Function to get the current location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      if (location) {
        onSend({ location: { longitude: location.coords.longitude, latitude: location.coords.latitude } });
      } else Alert.alert("Something went wrong, try again!");
    } else Alert.alert("Permission not granted");
  };

  // Function to generate a unique reference string for the image
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // Function to convert the image file to a blob
  const convertFileToBlob = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(new Error("XHR request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send();
    });
  };

  // Function to upload the image and send the picture
  const uploadAndSendPic = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const blob = await convertFileToBlob(imageURI);
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Let you choose to add or send an image or to share your location."
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
