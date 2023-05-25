import React from "react";
import { View, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

const OthersCard = () => {
  const tailwind = useTailwind();
  return (
    <Card style={tailwind("mt-4 mx-8 p-4 rounded-3xl bg-white mb-4")}>
      <Text style={tailwind("text-xl font-bold px-4")}>Otros</Text>
      <View style={tailwind("flex")}>
        <View style={tailwind("flex-row justify-between items-center")}>
          <View style={tailwind("flex-row items-center")}>
            <IconButton icon="email-outline" size={24} iconColor="#818cf8" />
            <Text style={tailwind("text-sm")}>Contactanos</Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor="#818cf8" />
        </View>
        <View style={tailwind("flex-row justify-between items-center")}>
          <View style={tailwind("flex-row items-center")}>
            <IconButton icon="shield-check-outline" size={24} iconColor="#818cf8" />
            <Text style={tailwind("text-sm")}>Política de privacidad</Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor="#818cf8" />
        </View>
        <View style={tailwind("flex-row justify-between items-center")}>
          <View style={tailwind("flex-row items-center")}>
            <IconButton icon="cog-outline" size={24} iconColor="#818cf8" />
            <Text style={tailwind("text-sm")}>Configuración</Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor="#818cf8" />
        </View>
      </View>
    </Card>
  );
};

export default OthersCard;
