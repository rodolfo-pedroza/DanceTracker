import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TextInput } from "react-native-paper";

const WeightHeightInputs = ({ value, onChangeText, placeholder, icon }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-row justify-between items-center py-3")}>
      <View style={tailwind("w-72")}>
        <TextInput
          placeholder={placeholder}
          keyboardType="numeric"
          value={value}
          onChangeText={onChangeText}
          mode="flat"
          left={<TextInput.Icon icon={icon} />}
          style={tailwind("bg-gray-200 rounded-2xl")}
        />
      </View>
      <View style={tailwind("bg-blue-300 p-3.5 rounded-2xl")}>
        <Text style={tailwind("text-sm text-white")}>KG</Text>
      </View>
    </View>
  );
};

export default WeightHeightInputs;
