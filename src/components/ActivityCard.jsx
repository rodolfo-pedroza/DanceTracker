import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { useTailwind } from "tailwind-rn";
import { useFitbitAuth } from "../hooks/useFitbitAuth";

function ActivityCard() {
  const tailwind = useTailwind();

  const { authToken, useFitbitAuthRequest } = useFitbitAuth();
  const [heartRate, setHeartRate] = useState(null);

  console.log("authToken", authToken);

  useEffect(() => {
    // useFitbitAuthRequest();
    if (authToken) {
      fetchHeartRate();
    }
  }, [authToken]);

  const fetchHeartRate = async () => {
    try {
      const response = await fetch(
        `https://api.fitbit.com/1/user/-/activities/heart/date/today.json`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.map);

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        
        const heartRate = data["activities-heart"][0].restingHeartRate;
        console.log(heartRate);
        setHeartRate(heartRate);
      } else {
        console.log("Error fetching heart rate");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tailwind("mx-8 mt-4")}>
      <Text style={tailwind("text-lg font-bold")}>Estatus de hoy</Text>
      <Card style={tailwind("px-4 mt-4 rounded-3xl bg-indigo-100")}>
        <Text style={tailwind("text-base font-bold mx-4 pt-4")}>
          Ritmo cardiaco
        </Text>
        <Card.Content>
          <Text style={tailwind("text-base font-bold text-indigo-400")}>
            78 BPM {heartRate && `(${heartRate} BPM)`}
          </Text>
          <Image
            source={require("../assets/images/Heart-Rate-Graph.png")}
            style={tailwind("h-20")}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

export default ActivityCard;
