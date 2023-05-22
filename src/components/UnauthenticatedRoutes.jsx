import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../pages/Login";
import RegistrationPage from "../pages/Registration";

const Stack = createStackNavigator();

const UnAuthenticatedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false
    }} >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedRoutes;
