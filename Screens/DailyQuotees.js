import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const typingDone = useRef(false);

  useEffect(() => {
    if (typingDone.current) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
        typingDone.current = true;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <Text style={styles.typingText}>{displayedText}</Text>;
};

function DailyQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes(); // Fetch new quotes on component mount
  }, []);

  const fetchQuotes = async () => {
    try {
      const fetchedQuotes = [];

      for (let i = 0; i < 5; i++) {
        // Fetch 5 quotes by making 5 requests
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes",
          {
            headers: {
              "X-Api-Key": "44ADzIiHfy22b9QtadyZwQ==zo8acZSEP4GqufTc",
            },
          }
        );
        if (response.status === 200 && response.data.length > 0) {
          fetchedQuotes.push(response.data[0]); // Add each fetched quote to the array
        }
      }

      setQuotes(fetchedQuotes);
      await AsyncStorage.setItem("quotes", JSON.stringify(fetchedQuotes)); // Optional: Save quotes to AsyncStorage if needed
    } catch (error) {
      console.error("Error fetching quotes:", error.message || error);
      // Optionally, you can set static quotes here if you have any fallback
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require("../assets/Images/BackgroundImage1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Typing effect for the title */}
        <View style={styles.titleContainer}>
          <TypingEffect text="DAILY QUOTES" speed={100} />
        </View>

        {/* Swiper container for displaying the quotes */}
        <View style={styles.swiperContainer}>
          <View style={styles.card}>
            <ImageBackground
              source={require("../assets/Images/QuotesBackground1.jpg")}
              style={styles.cardBackground}
              imageStyle={{ borderRadius: 15 }}
            >
              <Swiper
                style={styles.wrapper}
                showsButtons={true}
                loop={true}
                autoplay={true}
                autoplayTimeout={0.75} // Auto-slide every 5 seconds
              >
                {quotes.map((quote, index) => (
                  <View key={index} style={styles.slide}>
                    <Text style={styles.quote}>"{quote.quote}"</Text>
                    <Text style={styles.author}>- {quote.author}</Text>
                  </View>
                ))}
              </Swiper>
            </ImageBackground>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  background: {
    flex: 1,
  },

  typingText: {
    fontSize: 30,
    color: "#FFD700",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  swiperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "90%",
    height: 550,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  cardBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },

  quote: {
    fontSize: 20,
    color: "#4B0082",
    textAlign: "center",
    marginHorizontal: 20,
    fontStyle: "italic",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  author: {
    fontSize: 16,
    color: "#8B0000",
    textAlign: "center",
    marginTop: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DailyQuotes;
