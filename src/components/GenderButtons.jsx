import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";

const GenderButtons = ({ genderValue, setGenderValue }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-row justify-around items-center py-3")}>
      <View style={tailwind("flex-1 flex-row justify-around items-center ")}>
        <Text style={tailwind("text-lg ")}>Femenino</Text>
        <View
          style={[
            tailwind("bg-white rounded-2xl"),
            genderValue === "female" &&
              tailwind("bg-fuchsia-200 rounded-2xl"),
          ]}
        >
          <IconButton
            icon="gender-female"
            size={30}
            onPress={() => setGenderValue("female")}
          />
        </View>
      </View>
      <View style={tailwind("flex-1 flex-row justify-around items-center ")}>
        <Text style={tailwind("text-lg ")}>Masculino</Text>
        <View
          style={[
            tailwind("bg-white rounded-2xl"),
            genderValue === "male" && tailwind("bg-blue-200 rounded-2xl"),
          ]}
        >
          <IconButton
            icon="gender-male"
            size={30}
            onPress={() => setGenderValue("male")}
          />
        </View>
      </View>
    </View>
  );
};

export default GenderButtons;
