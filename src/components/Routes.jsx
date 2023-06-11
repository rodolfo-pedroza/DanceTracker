import React from "react";
import AutenticatedRoutes from "./AutenticatedRoutes";
import UnautenticatedRoutes from "./UnauthenticatedRoutes";
import { useAuth } from "../contexts/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../pages/ProfilePage";
import UserDataPage from "../pages/UserDataPage";
import DanceRoutines from "../pages/DanceRoutines";
import RoutinePage from "../pages/RoutinePage";
import RecommendationsPage from "../pages/RecommendationsPage";
import SearchFoodPage from "../pages/SearchFoodPage";

const Stack = createStackNavigator();

function CombinedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AutenticatedRoutes"
        component={AutenticatedRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={Profile}
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      />
      <Stack.Screen
        name="UserDataPage"
        component={UserDataPage}
        options={{
          title: "Datos Personales",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      />
      <Stack.Screen
        name="DanceRoutinesPage"
        component={DanceRoutines}
        options={{
          title: "Rutinas de baile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      />
      <Stack.Screen
        name="RoutinePage"
        component={RoutinePage}
        options={{
          title: null,
          headerStyle: {
            backgroundColor: "#bfdbfe",
          },
        }}
      />
      <Stack.Screen
        name="RecommendationsPage"
        component={RecommendationsPage}
        options={{
          title: "Recomendaciones",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      />
      <Stack.Screen
        name="SearchFoodPage"
        component={SearchFoodPage}
        options={{
          title: "Buscar Alimento",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { user } = useAuth();
  return user ? <CombinedNavigator /> : <UnautenticatedRoutes />;
}
