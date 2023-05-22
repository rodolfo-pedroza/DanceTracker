import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/authContext.js";

function FitnessTracker() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Fitness Tracker</Text>
        </View>
    );
}

export default FitnessTracker;