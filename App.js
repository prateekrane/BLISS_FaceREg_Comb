import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./Screens/SignUp";
import EmotionScreen from "./Screens/Emotion";
import Main from "./Screens/Main";
export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
