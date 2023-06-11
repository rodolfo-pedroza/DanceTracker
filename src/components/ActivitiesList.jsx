import React from "react";
import { Image, View, Text } from "react-native";
import { Card} from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import useFetchActivityData from "../hooks/useFetchActivityData";

function LastActivitiesCard({ activity }) {
    const tailwind = useTailwind();
  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-white")}>
      <Card.Content>
        <View style={tailwind("flex-row ")}>
          <View style={tailwind("bg-blue-200 rounded-full p-3 mt-2")}>
            <Image source={require('../assets/images/activityIcon.png')}/>
          </View>
          <View style={tailwind("pl-4")}>
            <Text style={tailwind("text-base font-bold")}>{activity.title}</Text>
            {/* <Text style={tailwind("text-sm text-stone-700")}>Fecha: {activity.startTime}</Text> */}
            <Text style={tailwind("text-sm text-stone-700")}>Duración: {activity.duration}</Text>
            <Text style={tailwind("text-sm text-stone-700")}>Calorias quemadas: {activity.caloriesBurned}</Text>
          </View>
        </View>          
      </Card.Content>
    </Card>
  );
}

function ActivitiesList ({}) {
  const tailwind = useTailwind();
  const {activityData, loading } = useFetchActivityData();
  if (loading) {
    return (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <View>
      {activityData.map((activity, index) => (
        <LastActivitiesCard key={index} activity={activity} />
      ))}
    </View>
  );
}

export default ActivitiesList;
