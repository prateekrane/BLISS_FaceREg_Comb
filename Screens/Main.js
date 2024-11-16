import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import Emotion from "./Emotion"; // Import your Emotion screen

export default function Main() {
  const [currentScreen, setCurrentScreen] = useState("Main"); // Track the active screen

  const DATA = [
    { id: "1", animation: require("../assets/animation1.json") },
    { id: "2", animation: require("../assets/animation2.json") },
    { id: "3", animation: require("../assets/animation3.json") },
    { id: "4", animation: require("../assets/animation4.json") },
  ];

  const Card = ({ animation, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.cardAnimation}
      />
    </TouchableOpacity>
  );

  if (currentScreen === "Emotion") {
    return <Emotion onBack={() => setCurrentScreen("Main")} />;
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.centerContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          loop={true}
          autoplay={true}
          showsPagination={true}
          horizontal={true}
          nextButton={<Text style={styles.nextButton}>›</Text>}
          prevButton={<Text style={styles.prevButton}>‹</Text>}
        >
          {DATA.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Card
                animation={item.animation}
                onPress={() => setCurrentScreen("Emotion")}
              />
            </View>
          ))}
        </Swiper>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    paddingBottom: 10,
  },
  card: {
    width: 350,
    height: 550,
    backgroundColor: "transparent",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    transform: [{ scale: 0.95 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    overflow: "hidden",
  },
  cardAnimation: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  wrapper: {
    height: 650,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    marginRight: -30,
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -25 }],
  },
  prevButton: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    marginLeft: -30,
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -25 }],
  },
});
