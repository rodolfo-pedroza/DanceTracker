import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image } from "react-native";
import { Card, IconButton } from "react-native-paper";

import { useTailwind } from "tailwind-rn";

function GoalsCard({ icon, onIconPress }) {
  const tailwind = useTailwind();
  return (
    <Card style={tailwind("p-4 m-8 mt-4 rounded-3xl bg-indigo-100")}>
      <View style={tailwind("flex-row justify-between items-center")}>
        <Text style={tailwind("text-base font-bold mx-4")}>Metas de Hoy</Text>
        <View style={tailwind("bg-blue-300 rounded-2xl")}>
          <IconButton icon={icon} size={20} onPress={onIconPress} />
        </View>
      </View>
      <View style={tailwind("flex-row pt-4 mx-2")}>
        <View style={tailwind("flex-row bg-white px-2 py-1 w-36 rounded-3xl")}>
          <View style={tailwind("justify-center items-center")}>
            <Image source={require("../assets/images/glass1.png")} />
          </View>
          <View style={tailwind("ml-2")}>
            <Text style={tailwind("text-base font-bold text-indigo-400")}>
              2.5 L
            </Text>
            <Text style={tailwind("text-sm")}>Tomar Agua</Text>
          </View>
        </View>
        <View
          style={tailwind("flex-row bg-white px-2 py-1 w-36 rounded-3xl ml-4")}
        >
          <View style={tailwind("justify-center items-center")}>
            <Image source={require("../assets/images/boots1.png")} />
          </View>
          <View style={tailwind("ml-2")}>
            <Text style={tailwind("text-base font-bold text-indigo-400")}>
              2400
            </Text>
            <Text style={tailwind("text-sm")}>Pasos</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

export default GoalsCard;
