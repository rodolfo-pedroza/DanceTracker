import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";

const ProfileForm = ({ handleFormSubmit }) => {
  const [weightValue, setWeightValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const tailwind = useTailwind();

  return (
    <View style={tailwind("mx-8")}>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Tu peso"
              keyboardType="numeric"
              value={weightValue}
              onChangeText={(text) => setWeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="scale-bathroom" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>KG</Text>
          </View>
        </View>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Tu estatura"
              keyboardType="numeric"
              value={heightValue}
              onChangeText={(text) => setHeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="human-male-height" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>CM</Text>
          </View>
        </View>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Peso a alcanzar"
              keyboardType="numeric"
              value={goalWeightValue}
              onChangeText={(text) => setGoalWeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="scale-bathroom" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>KG</Text>
          </View>
        </View>
      </View>
  );
};

export default ProfileForm;
