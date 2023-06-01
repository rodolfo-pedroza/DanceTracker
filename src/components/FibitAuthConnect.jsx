import React from "react";
import { Button, Platform, Text, View } from "react-native";
import { useFitbitAuth } from "../hooks/useFitbitAuth";


const FitbitAuthConnect = () => {
  const { authToken, useFitbitAuthRequest } = useFitbitAuth();

  // console.log('AuthToken:', authToken);

  const handlePress = async () => {
    useFitbitAuthRequest();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {authToken ? (
        <Text>Fitbit Conectado</Text>
      ) : (
        <Button title="Authorize Fitbit" onPress={handlePress} />
      )}
    </View>
  );
};

export default FitbitAuthConnect;
