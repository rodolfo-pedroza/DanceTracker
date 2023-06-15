import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import useFetchActivityData from "../hooks/useFetchActivityData";

const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
};

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const groupActivitiesByDate = (activities) => {
  const groupedActivities = activities.reduce((result, activity) => {
    const date = parseLocalDate(activity.startTime).toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(activity);
    return result;
  }, {});

  return Object.entries(groupedActivities).map(([date, activities]) => ({
    title: date,
    data: activities,
  }));
};


function LastActivitiesCard({ activity }) {
  const tailwind = useTailwind();
  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-white")}>
      <Card.Content>
        <View style={tailwind("flex-row ")}>
          <View style={tailwind("bg-blue-200 rounded-full p-3 mt-2")}>
            <Image source={require("../assets/images/activityIcon.png")} />
          </View>
          <View style={tailwind("pl-4")}>
            <Text style={tailwind("text-base font-bold")}>
              {activity.title}
            </Text>
            <Text style={tailwind("text-sm text-stone-700")}>
              Duración: {activity.duration}
            </Text>
            <Text style={tailwind("text-sm text-stone-700")}>
              Calorias quemadas: {activity.caloriesBurned}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

function ActivitiesList({ showOnlyToday }) {
  const tailwind = useTailwind();
  const { activityData } = useFetchActivityData();

  const filteredActivities = showOnlyToday
    ? activityData.filter((activity) =>
        isToday(parseLocalDate(activity.startTime))
      )
    : activityData;

  const sections = groupActivitiesByDate(filteredActivities);

  return (
    <View>
      {sections.map((section) => (
        <View key={section.title}>
          {!showOnlyToday && (
            <Text style={tailwind("text-lg font-bold px-8 my-2 text-center")}>
              {section.title}
            </Text>
          )}
          {section.data.map((item) => (
            <LastActivitiesCard key={item.id} activity={item} />
          ))}
        </View>
      ))}
    </View>
  );
}

export default ActivitiesList;
