import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import ThumbnailList from "../components/ThumbnailsList";

const DanceRoutines = ({ route }) => {
  const tailwind = useTailwind();
  const { categoria } = route.params;

  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  return (
    <ScrollView style={tailwind("bg-white mb-4")}>
      <Text style={tailwind("text-2xl font-bold px-8 text-center")}>
        {categoria.name}
      </Text>
      <View style={tailwind("flex-row justify-between  px-8 py-4")}>
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 w-28 p-2 rounded-full"),
            selectedLevel === "beginner" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleLevelChange("beginner")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedLevel === "beginner" && tailwind("text-white"),
            ]}
          >
            Principiante
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 w-28 p-2 rounded-full"),
            selectedLevel === "normal" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleLevelChange("normal")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedLevel === "normal" && tailwind("text-white"),
            ]}
          >
            Normal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tailwind("bg-indigo-200 w-28 p-2 rounded-full"),
            selectedLevel === "advanced" && tailwind("bg-indigo-500"),
          ]}
          onPress={() => handleLevelChange("advanced")}
        >
          <Text
            style={[
              tailwind("text-sm text-center"),
              selectedLevel === "advanced" && tailwind("text-white"),
            ]}
          >
            Avanzado
          </Text>
        </TouchableOpacity>
      </View>
      <ThumbnailList categoria={categoria} selectedLevel={selectedLevel} />
    </ScrollView>
  );
};

export default DanceRoutines;
