import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import useFetchUserData from "../hooks/useFetchUserData";
import useFetchRecommendedVideos from "../hooks/useFetchRecommendedVideos";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import useProfileData from "../hooks/useProfileData";

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

const RecommendationsPage = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();

  const { userData, fetchUserData } = useFetchUserData();
  const [selectedCategory, setSelectedCategory] = useState("salsa");
  const navigation = useNavigation();
  const { profileData } = useProfileData(user);
  const classification = profileData?.classification;
  const bmi = profileData?.bmi;
  const bmr = profileData?.bmr;

  const { data, isLoading } = useFetchRecommendedVideos(
    userData,
    bmi,
    bmr,
    classification
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const transformData = (data) => {
    const transformedData = {};

    for (const key in data) {
      transformedData[key] = {
        video: [data[key]],
      };
    }

    return transformedData;
  };

  const transformedData = data ? transformData(data) : null;

  return (
    <ScrollView>
      <View
        style={tailwind("flex flex-row justify-between items-center px-8 pt-8")}
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
          {isLoading ? (
            <View style={tailwind("flex-1 items-center justify-center mt-4")}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={tailwind("text-center text-xl mt-4")}>
                Cargando...
              </Text>
            </View>
          ) : !transformedData || Object.keys(transformedData).length === 0 ? (
            <Text style={tailwind("text-center text-xl mt-4")}>
              Aún no contamos con videos que podamos recomendarte, estamos
              trabajando en videos para ti.😊{" "}
            </Text>
          ) : !transformedData[selectedCategory]?.video ? (
            <Text>No hay videos recomendados para esta categoria</Text>
          ) : (
            transformedData[selectedCategory]?.video?.map((video) => (
              <TouchableOpacity
                key={video.video_id}
                onPress={() => navigation.navigate("RoutinePage", { video })}
                style={tailwind("rounded-3xl mt-4 mx-4 bg-slate-700")}
              >
                <ImageBackground
                  source={{
                    uri: video.thumbnail,
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
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecommendationsPage;
