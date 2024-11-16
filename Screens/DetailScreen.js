import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen({ cameraValue = "Default Value" }) {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Message display area */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{cameraValue}</Text>
        </View>

        {/* Options container */}
        <View style={styles.optionsContainer}>
          {/* Option buttons */}
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Emo-Tune</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Quotes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Wallscape</Text>
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between", // Ensures space is distributed between content
  },
  messageBox: {
    backgroundColor: "white",
    padding: 20, // Increased padding
    borderRadius: 10,
    // marginBottom: 20,
    marginTop: 50,
    height: 300, // Set a fixed height (adjust as needed)
    justifyContent: "center", // Ensures the text is centered vertically
  },
  messageText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  optionsContainer: {
    // marginTop: 40, // Reduced marginTop to bring the options container higher
    marginBottom: 160,
    gap: 50,
  },
  optionButton: {
    backgroundColor: "transparent", // Light green color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  optionText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold", // Bold text for emphasis
    textAlign: "center", // Center the text inside the button
    letterSpacing: 1.2, // Slight spacing between letters for readability
    textTransform: "uppercase", // Capitalize the text for a modern look
  },
});
