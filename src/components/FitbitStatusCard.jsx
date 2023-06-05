import { Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import { format } from 'date-fns';
import useFitbitData from "../hooks/useFitbitData";
import { useState } from "react";

const FitbitStatusCard = () => {
  const tailwind = useTailwind();
  const { calories, steps, distance } = useFitbitData(getCurrentDate());
  const roundedDistance = Math.round(distance * 100) / 100;

  function  getCurrentDate () {
    const currentDate = new Date()
    return newDate = format(currentDate, 'yyyy-MM-dd')
    };

  return (
    <View
      style={tailwind("flex-row mx-8 my-4 h-40 py-4 px-8 bg-white rounded-3xl")}
    >
      <View style={tailwind("flex-1 flex-row justify-between items-center")}>
        <View style={tailwind("flex")}>
            <View style={tailwind("")}>
                <IconButton
                    icon="fire"
                    iconColor="#059669"
                    size={32}
                    disabled={true}
                />
            </View>
            <Text style={tailwind("text-base font-bold text-center text-indigo-300")}>{calories}</Text>
            <Text style={tailwind("text-sm text-center")}>Calorias</Text>
        </View>
        <View style={tailwind("flex")}>
            <View style={tailwind("")}>
                <IconButton
                    icon="shoe-sneaker"
                    iconColor="#059669"
                    size={32}
                    disabled={true}
                />
            </View>
            <Text style={tailwind("text-base font-bold text-center text-indigo-300")}>{steps}</Text>
            <Text style={tailwind("text-sm text-center")}>Pasos</Text>
        </View>
        <View style={tailwind("flex")}>
            <View style={tailwind("")}>
                <IconButton
                    icon="map-marker"
                    iconColor={"#ff0000"}
                    size={32}
                    disabled={true}
                />
            </View>
            <Text style={tailwind("text-base font-bold text-center text-indigo-300")}>{roundedDistance}</Text>
            <Text style={tailwind("text-sm text-center")}>Km</Text>
        </View>
      </View>

      <View></View>
    </View>
  );
};

export default FitbitStatusCard;
