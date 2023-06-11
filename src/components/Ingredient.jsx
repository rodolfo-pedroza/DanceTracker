import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

const Ingredient = ({ name, image, onPress }) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      style={tailwind(
        "flex flex-row items-center bg-white px-2 rounded-2xl my-2"
      )}
    >
      <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
      <Text style={tailwind("ml-4 text-sm font-bold")}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Ingredient;
