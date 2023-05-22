import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/authContext.js";
import { useTailwind } from "tailwind-rn";
import { Avatar } from "react-native-paper";
import BMICard from "../components/BMICard.jsx";
import ActivityCard from "../components/ActivityCard.jsx";
import CaloriesCard from "../components/CaloriesCard.jsx";
import GoalsCard from "../components/GoalsCard.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function Home({ navigation }) {
  const { user, logout, loading } = useAuth();
  const tailwind = useTailwind();
  console.log(user);

  const onFooterLinkPress = () => {
    try {
      logout();
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={tailwind("flex-row px-8 justify-between")}>
            <View>
              <Text>Bienvenido</Text>
              <Text style={tailwind("text-lg font-bold")}>
                {user.displayName}
              </Text>
            </View>
            <View style={tailwind("justify-center")}>
              <Avatar.Image size={30} source={{ uri: user.photoURL }} />
            </View>
          </View>
          <BMICard />
          <ActivityCard />
          <CaloriesCard />
          <GoalsCard />
          <View style={tailwind("flex-1 items-center content-center")}>
            <Text>Welcome, {user.displayName}</Text>
            <Text style={tailwind("text-blue-600")}>
              <Text onPress={onFooterLinkPress}>Log Out</Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Home;
