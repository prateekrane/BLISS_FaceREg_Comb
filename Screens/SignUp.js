import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { createUser } from "../Auth/Auth"; // Ensure this points to your authentication file
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main"; // Ensure the correct import path
import EmotionScreen from "./Emotion";
import WallpaperScreen from "./Wallpapers";
import MusicScreen from "./Music";
// Create a navigation ref for manual navigation
const navigationRef = React.createRef();

const SignUp = () => {
  // State to hold input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle user signup
  const handleSignup = async () => {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      await AsyncStorage.setItem("token", token);

      // Clear input fields after signup
      setName("");
      setEmail("");
      setPassword("");

      Alert.alert("Sign Up Successful!");

      // Manually navigate to "Main" screen
      if (navigationRef.current) {
        navigationRef.current.navigate("Main");
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      Alert.alert(
        "Authentication Failed!",
        "Could not create user, please check your input and try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        source={require("../assets/UpperImg.png")} // path to your top image
        style={styles.topImage}
      />
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === "ios" ? 100 : 150}
      >
        <View style={{ marginTop: 90, width: "90%" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>Create New</Text>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.text}>Account</Text>
          </View>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor="#0d522c"
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#0d522c"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#0d522c"
            secureTextEntry={true}
          />

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* Loading Animation */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <LottieView
            source={require("../assets/load.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Emotion" component={EmotionScreen} />
        <Stack.Screen name="Wallpaper" component={WallpaperScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  text: {
    color: "#0d522c",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: "#77bba2",
    textAlign: "center",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#3c7962",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
});
