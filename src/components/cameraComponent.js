// import React, { useRef, useState } from "react";
// import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { CameraType } from "expo-camera/build/legacy/Camera.types";
// import * as MediaLibrary from "expo-media-library";
// import { Button } from "../components/Button";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import * as FileSystem from "expo-file-system";

// const RAPIDAPI_KEY = "35e985ba55msh3c371fd543238c7p11cf93jsn01b9e0b8120b"; // Replace with your RapidAPI key

// export default function CameraComponent() {
//   const [image, setImage] = useState(null);
//   const [cameraType, setCameraType] = useState(CameraType.front);
//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const data = await cameraRef.current.takePictureAsync();
//         console.log(data);
//         setImage(data.uri);
//         await analyzeImage(data.uri); // Call the emotion detection API with the image URI
//       } catch (error) {
//         console.log("Error taking picture:", error);
//       }
//     }
//   };

//   const analyzeImage = async (imageUri) => {
//     const url = "https://emotion-detection2.p.rapidapi.com/emotion-detection";

//     // Convert image to base64
//     const base64Image = await convertImageToBase64(imageUri);

//     const options = {
//       method: "POST",
//       headers: {
//         "x-rapidapi-key": RAPIDAPI_KEY,
//         "x-rapidapi-host": "emotion-detection2.p.rapidapi.com",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ image: base64Image }), // Use base64 string in the body
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json(); // Use json() instead of text() for JSON response
//       console.log("Emotion Detection Result:", result);
//     } catch (error) {
//       console.error("Error detecting emotions:", error);
//     }
//   };
//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       return `data:image/jpeg;base64,${base64}`; // Add the data URL prefix
//     } catch (error) {
//       console.log("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const savePicture = async () => {
//     if (image) {
//       try {
//         const asset = await MediaLibrary.createAssetAsync(image);
//         alert("Picture saved! 🎉");
//         setImage(null);
//         console.log("Saved successfully");
//       } catch (error) {
//         console.log("Error saving picture:", error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!image ? (
//         <CameraView style={styles.camera} ref={cameraRef} facing={cameraType}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 30,
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => {
//                 setCameraType(
//                   cameraType === CameraType.back
//                     ? CameraType.front
//                     : CameraType.back
//                 );
//               }}
//             >
//               <View
//                 style={{
//                   height: 50,
//                   width: 50,
//                   backgroundColor: "black",
//                   borderRadius: 5,
//                   marginTop: 10,
//                 }}
//               >
//                 <AntDesign name="swap" size={45} color="white" />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       ) : (
//         <Image source={{ uri: image }} style={styles.camera} />
//       )}

//       <View style={styles.controls}>
//         {image ? (
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 50,
//             }}
//           >
//             <Button
//               title="Re-take"
//               onPress={() => setImage(null)}
//               icon="retweet"
//             />
//             <Button title="Save" onPress={savePicture} icon="check" />
//           </View>
//         ) : (
//           <View style={styles.button}>
//             <TouchableOpacity onPress={takePicture} style={styles.outerCircle}>
//               <View style={styles.innerCircle}>
//                 <MaterialIcons name="camera" size={30} color="white" />
//               </View>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.75,
//     justifyContent: "center",
//     paddingTop: 20,
//     backgroundColor: "#000",
//     padding: 8,
//     width: "90%",
//     borderRadius: 20,
//   },
//   controls: {
//     flex: 0.5,
//   },
//   button: {
//     height: 40,
//     borderRadius: 6,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#E9730F",
//     marginLeft: 10,
//   },
//   camera: {
//     flex: 5,
//     borderRadius: 20,
//   },
//   topControls: {
//     flex: 1,
//   },
//   outerCircle: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
//     borderRadius: 50, // Ensures the button is circular
//     height: 50, // Circle size
//     width: 50, // Circle size
//     borderWidth: 2, // Border width for the outer circle
//     borderColor: "white", // Color of the border
//     marginTop: 20,
//   },
// });

import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import * as MediaLibrary from "expo-media-library";
import { Button } from "../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";

const EmotionComponent = ({ onImageCaptured }) => {
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        await onImageCaptured(data.uri); // Call the function passed from EmotionScreen
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("Saved successfully");
      } catch (error) {
        console.log("Error saving picture:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView style={styles.camera} ref={cameraRef} facing={cameraType}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCameraType(
                  cameraType === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: "black",
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <AntDesign name="swap" size={45} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <View style={styles.button}>
            <TouchableOpacity onPress={takePicture} style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <MaterialIcons name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#000",
    padding: 8,
    width: "90%",
    borderRadius: 20,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
    borderRadius: 50, // Ensures the button is circular
    height: 50, // Circle size
    width: 50, // Circle size
    borderWidth: 2, // Border width for the outer circle
    borderColor: "white", // Color of the border
    marginTop: 20,
  },
});

export default EmotionComponent;
