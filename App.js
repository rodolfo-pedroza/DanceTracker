import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AutenticatedRoutes from "./src/components/AutenticatedRoutes";
import UnauthenticatedRoutes from "./src/components/UnauthenticatedRoutes";
import { auth } from "./src/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
