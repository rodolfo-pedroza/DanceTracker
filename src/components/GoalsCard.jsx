import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { useTailwind } from "tailwind-rn";

function MyComponent() {
  const tailwind = useTailwind();

  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-indigo-200")}>
      <Text style={tailwind("text-base font-bold mx-4 pt-4")}>Metas de Hoy</Text>
      <Card.Content style={tailwind("flex")}>
        <View style={tailwind("flex-row justify-between")}>
            <View style={tailwind('flex-row')} >
                <Image source={require('../assets/images/glass1.png')} style={tailwind()} />
                <View style={tailwind('justify-between')}>
                    <Text style={tailwind('text-base font-bold text-indigo-400')}>2.5 L</Text>
                    <Text style={tailwind('text-base font-bold text-indigo-400')}>Agua</Text>
                </View>
            </View>
            <Image source={require('../assets/images/boots1.png')} style={tailwind()} />
        </View>
      </Card.Content>
    </Card>
  );
}

export default MyComponent;
