import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { useTailwind } from "tailwind-rn";

function MyComponent() {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('mx-8 mt-4')} >
      <Text style={tailwind('text-lg font-bold')} >Estatus de hoy</Text>
      <Card style={tailwind("px-4 mt-4 rounded-3xl bg-indigo-100")}>
        <Text style={tailwind('text-base font-bold mx-4 pt-4')} >Ritmo cardiaco</Text>
        <Card.Content>
          <Text style={tailwind('text-base font-bold text-indigo-400')}>78 BPM</Text>
          <Image source={require('../assets/images/Heart-Rate-Graph.png')} style={tailwind('h-20')} />
        </Card.Content>
      </Card>
    </View>
  );
}

export default MyComponent;
