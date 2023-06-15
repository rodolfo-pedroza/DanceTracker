import React from "react";
import { View } from "react-native";
import ActivitiesList from "../components/ActivitiesList";

function ActivityHistoryPage() {
  return (
    <View>
      <ActivitiesList showOnlyToday={false} />
    </View>
  );
}

export default ActivityHistoryPage;
