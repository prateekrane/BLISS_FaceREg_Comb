import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const WallpaperScreen = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [animatedText, setAnimatedText] = useState("");
  const title = "Wallpaper Screen";

  // Fetch wallpapers from API
  useEffect(() => {
    fetchWallpapers();
  }, []);

  const fetchWallpapers = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/search/photos?query=cars&client_id=PVUm911FOKsh9160hRywEKOaU-4i6bh00JbSh7PgWPE"
      );
      const data = await response.json();
      setWallpapers(data.results); // Use `data.results` for search queries
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    }
  };

  // Typewriter effect for title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText((prev) => prev + title[index]);
      index += 1;
      if (index === title.length) clearInterval(interval);
    }, 100); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  // Render each wallpaper
  const renderItem = ({ item }) => (
    <View style={styles.wallpaperContainer}>
      <Image source={{ uri: item.urls.small }} style={styles.wallpaperImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{animatedText}</Text>
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.wallpaperList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,

    textAlign: "center",
  },
  wallpaperList: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  wallpaperContainer: {
    flex: 1,
    margin: 12,
  },
  wallpaperImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default WallpaperScreen;
