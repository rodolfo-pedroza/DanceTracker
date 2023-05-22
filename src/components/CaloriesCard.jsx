import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { useTailwind } from "tailwind-rn";

function MyComponent() {
  const tailwind = useTailwind();

  return (
    <Card style={tailwind("px-4 mx-28 mt-4 rounded-3xl bg-white")}>
      <Text style={tailwind("text-base font-bold mx-4 pt-4")}>Calorias</Text>
      <Card.Content style={tailwind("flex")}>
        <Text
          style={tailwind("text-base font-bold text-indigo-400 items-start")}
        >
          760 kCal
        </Text>
        <View style={tailwind("items-center")}>
          <Image
            source={require("../assets/images/Calories-Pie.png")}
            style={tailwind("")}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

export default MyComponent;
