import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import VideoPlayer from "../components/VideoPlayer";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  roundedTop: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
});

const RoutinePage = ({ route }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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
  const { thumbnail, index } = route.params;

  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1 justify-between")}>
      <View style={tailwind("flex-1 bg-blue-200 px-6", { zIndex: 1 })}>
        <View style={tailwind("bg-blue-100 py-12 rounded-full")}>
          <VideoPlayer
            videoId={thumbnail.videoId}
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
          { zIndex: 2, marginTop: -100 },
        ]}
      >
        <View style={tailwind("flex-1 px-8 py-4")}>
          <View style={tailwind("flex-row justify-between items-center")}>
            <Text style={tailwind("text-xl font-bold ")}>
              Clase {thumbnail.rithm} {index + 1}
            </Text>
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
              {thumbnail.description}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => togglePlayBack()}
            style={tailwind("flex items-center p-4 rounded-full bg-indigo-300")}
          >
            <Text style={tailwind("text-lg font-bold text-white")}>
              {status.isPlaying ? "Pausar" : "Comenzar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RoutinePage;
