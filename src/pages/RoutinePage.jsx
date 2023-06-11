import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import VideoPlayer from "../components/VideoPlayer";
import { IconButton } from "react-native-paper";
import VideoPlayerControls from "../components/VideoPlayerControls";
import { descriptions } from "../data/constants";
import useFavoriteVideos from "../hooks/useFavoriteVideos";

const styles = StyleSheet.create({
  roundedTop: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
});

const RoutinePage = ({ route }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [duration, setDuration] = useState(0);

  // console.log("authToken", authToken);
  const togglePlayBack = async () => {
    if (!video.current) {
      console.log("no video");
      return;
    }

    if (status.isPlaying) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }
  };
  const clase = route.params.video;
  const description = descriptions.find((item) => item.name === clase.rhythm);

  const { isFavorite, toggleFavorite, isInitialized } = useFavoriteVideos(
    clase.routine_id,
  );

  const handleActivityData = (data) => {
    setCaloriesBurned(data.caloriesBurned);
    setDuration(data.duration);
  };
  // console.log("description", clase);

  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1 justify-between")}>
      <View style={tailwind("flex-1 bg-blue-200 px-6", { zIndex: 1 })}>
        <View style={tailwind("bg-blue-100 py-8 rounded-full")}>
          <VideoPlayer
            videoId={clase.video_url ? clase.video_url : clase.video_id}
            onTogglePlayback={togglePlayBack}
            videoRef={video}
            setStatus={setStatus}
          />
        </View>
      </View>
      <View
        style={[
          tailwind("flex-1 bg-white"),
          styles.roundedTop,
          { zIndex: 2, marginTop: -200 },
        ]}
      >
        <View style={tailwind("flex-1 px-8 py-4")}>
          <View style={tailwind("flex-row justify-between items-center")}>
            <Text style={tailwind("text-xl font-bold ")}>{clase.title}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(clase.creator)}
              style={tailwind("")}
            >
              <Image
                source={require("../assets/images/youtube.png")}
                style={tailwind("p-2 w-12 h-9")}
              />
            </TouchableOpacity>
            <IconButton
              icon={isFavorite ? "heart" : "heart-outline"}
              iconColor={isFavorite ? "#ff0000" : "#000"}
              size={30}
              onPress={toggleFavorite}
            />
          </View>
          <View style={tailwind("flex-row items-center")}>
            <View
              style={tailwind(
                "flex-row items-center justify-around bg-black px-4 w-36 rounded-full"
              )}
            >
              <IconButton
                icon="play-circle"
                iconColor="#ffff"
                size={20}
                style={tailwind("-ml-2")}
              />
              <Text style={tailwind("text-sm text-white")}>
                Duración: {duration.toFixed(1)}{" "}
              </Text>
            </View>
            <View
              style={tailwind(
                "flex-row items-center justify-around bg-black w-36 px-4 rounded-full ml-4"
              )}
            >
              <IconButton
                icon="fire"
                iconColor="#fff"
                size={20}
                style={tailwind("-ml-2")}
              />
              <Text style={tailwind("text-sm text-white")}>
                Calorias: {caloriesBurned}{" "}
              </Text>
            </View>
          </View>
          <View style={tailwind("my-2")}>
            <Text style={tailwind("text-lg font-bold my-2")}>Descripción </Text>
            <Text style={tailwind("text-sm text-gray-500")}>
              {description.description}
            </Text>
          </View>
          <VideoPlayerControls
            togglePlayBack={togglePlayBack}
            status={status}
            title={clase.title}
            onActivityData={handleActivityData}
          />
        </View>
      </View>
    </View>
  );
};

export default RoutinePage;
