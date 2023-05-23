import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/contexts/authContext";
import Routes from "./src/components/Routes";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </TailwindProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
