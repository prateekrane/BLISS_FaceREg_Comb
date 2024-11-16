import LottieView from "lottie-react-native"; // LottieView import
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Front() {
  return (
    <ImageBackground
      source={require("../assets/background.png")} // Local background image
      style={styles.background}
    >
      {/* Centered View for Lottie Animation */}
      <View style={styles.centeredView}>
        <LottieView
          source={require("../assets/face_id.json")} // Local Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />

        {/* TouchableOpacity below the animation */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              // Add your button action here
              alert("TouchableOpacity pressed");
            }}
          >
            <Text style={styles.buttonText}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  lottie: {
    width: 500, // Adjust according to your animation size
    height: 400,
    marginLeft: -100,
  },
  buttonContainer: {
    marginTop: 20, // Adds space between the animation and the button
    position: "absolute",
    bottom: 200, // Positions the button near the bottom of the screen
    width: 200,
  },
  touchable: {
    backgroundColor: "#3c7962", // Background color for the TouchableOpacity
    padding: 10,
    borderRadius: 20, // Rounded corners
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18, // Font size
    textAlign: "center",
  },
});
