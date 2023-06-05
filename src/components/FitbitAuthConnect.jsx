import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/authContext";
import { useTailwind } from "tailwind-rn";

const FitbitAuthConnect = () => {
  const { handleFitbitAuth } = useAuth();
  const tailwind = useTailwind();

  return (
    <View style={tailwind("my-2 mx-8 px-4 bg-white rounded-3xl")}>
      <View style={tailwind("flex-1 justify-center items-center")}>
        <TouchableOpacity
          style={tailwind("rounded-3xl p-2.5 m-2 mb-4 w-48 bg-teal-400")}
          onPress={handleFitbitAuth}
        >
          <Text style={tailwind("text-center text-white font-bold")}>
            Actualizar Fitbit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FitbitAuthConnect;
