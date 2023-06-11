import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";
import { getDisplayedDate } from "../utils/foodTrackerUtils";

const DateNavigation = ({ displayedDate, onPrevDate, onNextDate }) => {
  const tailwind = useTailwind();
  console.log('displayedDate', displayedDate)
  const formattedDate = `${displayedDate.getFullYear()}-${displayedDate.getMonth() + 1}-${displayedDate.getDate()}`;
  console.log('formattedDate', formattedDate)
  const today = new Date();
  const isToday = displayedDate.getDate() === today.getDate() && displayedDate.getMonth() === today.getMonth() && displayedDate.getFullYear() === today.getFullYear();

  return (
    <View style={tailwind("flex flex-row justify-center items-center px-8 py-4")}>
      <View style={tailwind("flex-1 flex-row items-center justify-between bg-white mx-4 rounded-3xl")}>
        <IconButton
          icon="chevron-left-circle-outline"
          size={24}
          onPress={onPrevDate}
          iconColor="#4338ca"
        />
        <Text style={tailwind("text-base font-bold")}>{getDisplayedDate(formattedDate)}</Text>
        <IconButton
          icon="chevron-right-circle-outline"
          size={24}
          onPress={onNextDate}
          iconColor="#4338ca"
          disabled={isToday}
        />
      </View>
    </View>
  );
};

export default DateNavigation;
