import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

const SleepCard = () => {
  const tailwind = useTailwind();
  return (
    <Card style={tailwind("mt-4 mx-8 p-4 rounded-3xl bg-indigo-100")}>
      <View style={tailwind("flex-row items-center")}>
        <View style={tailwind("")}>
          <Text style={tailwind("text-base font-bold px-4")}>
            Horas ideales de sueño
          </Text>
          <Text style={tailwind("text-lg text-indigo-400 px-4")}>
            8 horas 30 minutos
          </Text>
          <TouchableOpacity
            style={tailwind("rounded-3xl p-2.5 m-4 w-32 bg-indigo-300")}
          >
            <Text style={tailwind("text-sm text-white text-center")}>
              Aprende más
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind("")}>
          <Image
            source={require("../assets/images/sleepyMoon.png")}
            style={tailwind("")}
          />
        </View>
      </View>
    </Card>
  );
};

export default SleepCard;
