import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native"; // Import navigation

async function login(email, password) {
  // Mock login function (replace with actual implementation)
  if (email === "test@example.com" && password === "password123") {
    return "mock_token"; // Simulate a token return
  }
  throw new Error("Invalid credentials");
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation(); // Initialize navigation

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem("token", token);
      Alert.alert("Login Successful");
      setEmail("");
      setPassword("");
      // Navigate to the "Daily Quotes" screen after successful login
      navigation.navigate("DailyQuotes");
    } catch (error) {
      setEmail("");
      setPassword("");
      await AsyncStorage.removeItem("token");
      Alert.alert(
        "Authentication Failed",
        "Invalid email or password. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password pressed");
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <Image
        source={require("../assets/UpperImg.png")} // path to your top image
        style={styles.topImage}
      />

      <Text style={styles.loginText}>Login</Text>
      <TouchableOpacity>
        <Text style={styles.signInText}>Sign in to continue</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#0d522c"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#0d522c"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },

  loginText: {
    color: "#3c7962",
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    bottom: "60%",
    marginBottom: 25,
  },

  signInText: {
    color: "#0d522c",
    fontSize: 15,
    textAlign: "center",
    position: "center",
    bottom: 65,
    marginBottom: 10,
  },

  inputContainer: {
    position: "absolute",
    bottom: "40%",
    width: "80%",
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#77bba2",
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: "center",
    borderRadius: 50,
  },

  loginButton: {
    backgroundColor: "#3c7962",
    paddingVertical: 10,
    paddingHorizontal: 120,
    position: "absolute",
    bottom: "30%",
    borderRadius: 50,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },

  forgotButton: {
    marginTop: 10,
    position: "absolute",
    bottom: "23%",
  },
  forgotButtonText: {
    color: "#0d522c",
    fontSize: 16,
    textAlign: "center",
  },
});
