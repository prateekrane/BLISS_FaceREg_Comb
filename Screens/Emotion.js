import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import CameraComponent from "../src/components/cameraComponent";
import DetailScreen from "./DetailScreen"; // Import the DetailScreen

const API_URL =
  "https://2576-2409-40f4-2a-f3a1-fd30-855f-7a3f-4605.ngrok-free.app ";

const EmotionScreen = ({ onBack }) => {
  const [faces, setFaces] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [emotion, setEmotion] = useState(null); // State for emotion value
  const [isDetailScreenVisible, setIsDetailScreenVisible] = useState(false); // To toggle screens

  const handleFacesDetected = (detectedFaces) => {
    setFaces(detectedFaces);
  };

  const handleImageCaptured = async (uri) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      console.log("Captured Image URI:", uri);
      await sendImageToServer(uri);
    } catch (error) {
      console.error("Error handling captured image:", error);
      Alert.alert("Error", "Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  const sendImageToServer = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          "User-Agent": "emotion-detection-app",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();
      console.log("Emotion Detection Result:", data);

      if (data) {
        setEmotion(data.emotion); // Save emotion value
        setIsDetailScreenVisible(true); // Show DetailScreen
      }
    } catch (error) {
      console.error("Error sending image to server:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return isDetailScreenVisible ? (
    // Render DetailScreen and pass emotion as a prop
    <DetailScreen cameraValue={emotion} />
  ) : (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <Text style={styles.title}>Get Your Emotions</Text>

      <CameraComponent
        onImageCaptured={handleImageCaptured}
        onFacesDetected={handleFacesDetected}
        disabled={isProcessing}
      />

      {isProcessing && (
        <View style={styles.processingContainer}>
          <Text style={styles.processingText}>Processing image...</Text>
        </View>
      )}

      {faces.length > 0 && (
        <View style={styles.faceInfo}>
          <Text style={styles.faceText}>
            Smiling Probability: {faces[0]?.joyLikelihood}
          </Text>
          <Text style={styles.faceText}>
            Left Eye Open: {faces[0]?.leftEyeLikelihood}
          </Text>
          <Text style={styles.faceText}>
            Right Eye Open: {faces[0]?.rightEyeLikelihood}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  faceInfo: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
  faceText: {
    color: "#fff",
    fontSize: 16,
  },
  processingContainer: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 10,
  },
  processingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmotionScreen;
