import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

function MyComponent(  ) {
  const tailwind = useTailwind();
    const navigation = useNavigation();


  const navigateToProfilePage = () => {
    console.log("Navigate to ProfilePage");
    navigation.navigate("ProfilePage");
  };

  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-indigo-100")}>
      <Card.Title title="BMI (Índice de masa corporal)" />
      <Card.Content>
        <Text variant="bodyMedium">Tienes un peso (indice)</Text>
        <View style={tailwind()}>
          <TouchableOpacity
            style={tailwind("rounded-3xl p-2.5 mt-2 w-28 bg-purple-300 ")}
            onPress={navigateToProfilePage}
          >
            <Text style={tailwind("text-center")}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

export default MyComponent;
