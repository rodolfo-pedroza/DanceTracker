import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AutenticatedRoutes from "./src/components/AutenticatedRoutes";
import UnauthenticatedRoutes from "./src/components/UnauthenticatedRoutes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <View style={styles.container}>
          {user ? (
            <AutenticatedRoutes />
          ) : (
            <UnauthenticatedRoutes setUser={setUser} />
          )}
        </View>
      </NativeRouter>
    </>
  );
}
