import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/authContext.js";
import CaloriesChart from "../components/CaloriesChart.jsx";
import { useTailwind } from "tailwind-rn";

function FoodTracker() {
    const tailwind = useTailwind();
    return (
        <View style={tailwind('flex-1 items-center justify-center')}>
        <Text>Food Tracker</Text>
        <CaloriesChart />
        </View>
    );
}

export default FoodTracker;