import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useFetchVideos from "../hooks/useFetchVideos";

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    height: 300,
  },
});

const ThumbnailList = ({ categoria, selectedLevel }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { videos, loading, error } = useFetchVideos();

  const videosByCategory = videos && videos[categoria.name];
  const filteredVideos = videosByCategory ? videosByCategory.filter(
    (video) => video.difficulty === selectedLevel
  ) : [];

  const getRandomIndex = () => {
    return Math.floor(Math.random() * categoria.thumbnails.length);
  };

  if (loading) return (
    <Text style={tailwind("flex-1 items-center justify-center text-center text-xl mt-4")}>
        Cargando...
    </Text>
  )

  if (error) {
    return <Text>Error fetching videos {error}</Text>;
  }

  return (
    <>
      {videos && (
        <>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <TouchableOpacity
                key={index}
                style={tailwind(
                  "flex mt-4 mx-8 rounded-3xl bg-slate-700"
                )}
                onPress={() => navigation.navigate("RoutinePage", {video})}
              >
                <ImageBackground
                  source={{
                    uri: categoria.thumbnails[getRandomIndex()],
                  }}
                  style={styles.card}
                >
                  <View
                    style={tailwind(
                      "flex justify-center p-4 absolute bottom-0 left-0"
                    )}
                  >
                    <Text style={tailwind("text-white text-xl font-bold")}>
                      {video.rhythm}
                    </Text>
                    <Text style={tailwind("text-white text-sm")}>
                      {video.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={tailwind("flex-1 items-center justify-center text-center text-xl mt-4")}>
                No hay rutinas para este nivel
            </Text>
          )}
        </>
      )}
    </>
  );
};


export default ThumbnailList;
