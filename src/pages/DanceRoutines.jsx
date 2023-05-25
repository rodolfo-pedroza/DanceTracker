import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import ThumbnailList from "../components/ThumbnailsList";

const DanceRoutines = ({ route }) => {
  const tailwind = useTailwind();
  const { categoria } = route.params;
  return (
    <ScrollView style={tailwind("bg-white mb-4")}>
      <Text style={tailwind("text-2xl font-bold px-8 text-center")}>
        {categoria.name}
      </Text>
      <View style={tailwind("flex-row justify-between px-8 py-4")}>
        <TouchableOpacity
          style={tailwind("bg-indigo-200 w-32 p-2 rounded-full")}
        >
          <Text style={tailwind("text-sm text-center")}>Ejercitarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind("bg-indigo-200 w-32 p-2 rounded-full")}
        >
          <Text style={tailwind("text-sm text-center")}>Aprender</Text>
        </TouchableOpacity>
      </View>
      <ThumbnailList categoria={categoria} />
    </ScrollView>
  );
};

export default DanceRoutines;
