import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Card, Text } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

function MyComponent() {
  const tailwind = useTailwind();

  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-indigo-200")}>
      <Card.Title title="BMI (Índice de masa corporal)" />
      <Card.Content>
        <Text variant="bodyMedium">Tienes un peso (indice)</Text>
        <View style={tailwind()}>
          <TouchableOpacity
            style={tailwind("rounded-3xl p-2.5 mt-2 w-28 bg-purple-300 ")}
          >
            <Text style={tailwind("text-center")}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

export default MyComponent;
