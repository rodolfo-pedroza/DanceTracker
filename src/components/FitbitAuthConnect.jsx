import React, { memo, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/authContext";
import { useTailwind } from "tailwind-rn";

const FitbitAuthConnect = memo(() => {
  const { handleFitbitAuth } = useAuth();
  const tailwind = useTailwind();

  console.log("FitbitAuthConnect rendered");

  useEffect(() => {
    console.log("FitbitAuthConnect changed");
  }, [handleFitbitAuth]);
  
    
  return (
    <View style={tailwind("mx-8 px-4 rounded-3xl")}>
      <View style={tailwind("flex-1 justify-center items-center")}>
        <TouchableOpacity
          style={tailwind("rounded-3xl p-2.5 w-8 bg-teal-400")}
          onPress={handleFitbitAuth}
        >
          {/* <Text style={tailwind("text-center text-white font-bold")}>
            Actualizar Fitbit
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default FitbitAuthConnect;
