import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useFetchFavoriteVideos from "../hooks/useFetchFavoriteVideos";
import { images } from "../data/constants";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    height: 300,
  },
});

const FavoritesPage = () => {
  const tailwind = useTailwind();

  const { videos, loading } = useFetchFavoriteVideos();
  const [selectedCategory, setSelectedCategory] = useState("salsa");
  const navigation = useNavigation();

  const [videoImageIndexes, setVideoImageIndexes] = useState({});

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    setVideoImageIndexes((prevState) => {
        const updatedIndexes = {}
        for (const video of videos[category]) {
            updatedIndexes[video.routine_id] = Math.floor(Math.random() * images.length)
        }
        return updatedIndexes
    })
};

  return (
    <ScrollView style={styles.container}>
      <View style={tailwind("flex items-center mt-2")}>
        <Text style={tailwind("text-2xl font-bold")}>Favoritos </Text>
      </View>
      <View
        style={tailwind("flex flex-row justify-between items-center px-8 py-4")}
      >
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 p-2 rounded-full w-28"),
            selectedCategory === "bachata" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleCategoryChange("bachata")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedCategory === "bachata" && tailwind("text-white"),
            ]}
          >
            bachata
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 p-2 rounded-full w-28"),
            selectedCategory === "salsa" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleCategoryChange("salsa")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedCategory === "salsa" && tailwind("text-white"),
            ]}
          >
            salsa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 p-2 rounded-full w-28"),
            selectedCategory === "reggaeton" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleCategoryChange("reggaeton")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedCategory === "reggaeton" && tailwind("text-white"),
            ]}
          >
            reggaeton
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind("flex-1 px-8 py-4 ")}>
        <View>
          {loading ? (
            <Text>Cargando...</Text>
          ) : videos[selectedCategory] &&
            videos[selectedCategory]?.length > 0 ? (
            videos[selectedCategory]?.map((video) => (
              <TouchableOpacity
                key={video.routine_id}
                style={tailwind("rounded-3xl mt-4 mx-4 bg-slate-700")}
                onPress={() => navigation.navigate("RoutinePage", { video })}
              >
                <ImageBackground
                  source={{
                    uri: images[0].thumbnails[videoImageIndexes[video.routine_id]],
                  }}
                  style={styles.card}
                >
                  <View
                    style={tailwind(
                      "flex justify-center p-4 absolute bottom-0 left-0"
                    )}
                  >
                    <Text style={tailwind("text-white text-lg font-bold")}>
                      {video.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={tailwind("text-lg font-bold text-center")}>
              No hay videos favoritos
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FavoritesPage;
