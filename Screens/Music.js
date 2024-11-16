import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import base64 from "react-native-base64";
import { useNavigation } from "@react-navigation/native";

const SPOTIFY_CLIENT_ID = "62e53d645ea04a028e858af03bdd26ba";
const SPOTIFY_CLIENT_SECRET = "941d4ef4a4d14ace99e8992eaa2bc767";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_RECOMMENDATIONS_URL =
  "https://api.spotify.com/v1/recommendations";

const MusicScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch(SPOTIFY_TOKEN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              base64.encode(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
          },
          body: "grant_type=client_credentials",
        });

        const data = await response.json();
        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error("Failed to fetch access token:", data);
        }
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch(
          `${SPOTIFY_RECOMMENDATIONS_URL}?limit=20&seed_genres=pop&target_valence=0.9`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // seed_genres is responsible for the genre of the music
        // Genre means happy sad etc...... => check .md file for more details
        const data = await response.json();
        if (data.tracks) {
          const tracksData = data.tracks
            .map((item) => ({
              id: item.id,
              name: item.name,
              artist: item.artists[0]?.name,
              previewUrl: item.preview_url,
              imageUrl: item.album.images[1]?.url,
            }))
            .filter((track) => track.name && track.previewUrl);

          setTracks(tracksData);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching Spotify tracks:", error);
      }
    };

    fetchTracks();
  }, [accessToken]);

  const openSongDetails = (trackIndex) => {
    navigation.navigate("SongDetails", {
      track: tracks[trackIndex],
      tracks,
      initialTrackIndex: trackIndex,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/mbackground.jpeg")}
      style={styles.container}
    >
      <Text style={styles.musicHeader}>Happy Music</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => openSongDetails(index)}
            style={styles.songItem}
          >
            <Image
              source={{
                uri: item.imageUrl || "https://via.placeholder.com/50",
              }}
              style={styles.songImage}
            />
            <View>
              <Text style={styles.songTitle}>{item.name}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  musicHeader: {
    color: "#00FFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
  },
  songTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  songArtist: {
    color: "lightgray",
    fontSize: 14,
  },
});

export default MusicScreen;
