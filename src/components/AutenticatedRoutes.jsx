import React from "react";
import Home from "../pages/Home";
import CompleteProfile from "../pages/CompleteProfile";
import Gallery from "../pages/Gallery";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import theme from "../theme";
import FoodTracker from "../pages/FoodTracker";
import FitnessTracker from "../pages/FitnessTracker";


const Tab = createMaterialBottomTabNavigator();

const AutenticatedRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.gray2}
      labelStyle={{ fontSize: 10 }}
      barStyle={{ backgroundColor: theme.colors.white }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-gallery-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FoodTracker"
        component={FoodTracker}
        options={{
          tabBarLabel: "FoodTracker",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-variant" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={FitnessTracker}
        options={{
          tabBarLabel: "Tracker",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-arc" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AutenticatedRoutes;
