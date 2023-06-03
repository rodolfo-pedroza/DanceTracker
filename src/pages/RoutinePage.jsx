import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import VideoPlayer from "../components/VideoPlayer";
import { IconButton } from "react-native-paper";
import { useAuth } from "../contexts/authContext";
import VideoPlayerControls from "../components/VideoPlayerControls";
import { descriptions } from "../data/constants";

const styles = StyleSheet.create({
  roundedTop: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
});

const RoutinePage = ({ route }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { authToken } = useAuth();
  const [userData, setUserData] = useState({});

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
  const clase  = route.params.video;
  const description = descriptions.find((item) => item.name === clase.rhythm);

  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1 justify-between")}>
      <View style={tailwind("flex-1 bg-blue-200 px-6", { zIndex: 1 })}>
        <View style={tailwind("bg-blue-100 py-8 rounded-full")}>
          <VideoPlayer
            videoId={clase.video_url}
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
            <IconButton
              icon="heart-outline"
              iconColor="red"
              size={30}
              onPress={() => console.log("icon pressed")}
            />
          </View>
          <View style={tailwind("flex-row items-center")}>
            <View
              style={tailwind(
                "flex-row items-center bg-black w-32 rounded-full"
              )}
            >
              <IconButton
                icon="play-circle"
                iconColor="#ffff"
                size={20}
                onPress={() => console.log("icon pressed")}
              />
              <Text style={tailwind("text-sm text-white")}>Duración: </Text>
            </View>
            <View
              style={tailwind(
                "flex-row items-center bg-black w-32 rounded-full ml-4"
              )}
            >
              <IconButton
                icon="fire"
                iconColor="#fff"
                size={20}
                onPress={() => console.log("icon pressed")}
              />
              <Text style={tailwind("text-sm text-white")}>Calorias: </Text>
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
            className={clase.title}
          />
        </View>
      </View>
    </View>
  );
};

export default RoutinePage;
