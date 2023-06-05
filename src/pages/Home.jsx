import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useAuth } from "../contexts/authContext.js";
import { useTailwind } from "tailwind-rn";
import { Avatar } from "react-native-paper";
import BMICard from "../components/BMICard.jsx";
import ActivitiesList from "../components/ActivitiesList.jsx";
import FitbitStatusCard from "../components/FitbitStatusCard.jsx";
import FitbitAuthConnect from "../components/FitbitAuthConnect.jsx";
import useFetchActivityData from "../hooks/useFetchActivityData.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function Home({ navigation }) {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const {activityData, loading } = useFetchActivityData();

  console.log('activityData', activityData);

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
            <TouchableOpacity
              style={tailwind("justify-center")}
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <View>
                <Avatar.Image size={30} source={{ uri: user.photoURL }} />
              </View>
            </TouchableOpacity>
          </View>
          <BMICard />
          <FitbitAuthConnect />
          <FitbitStatusCard />
          <Text style={tailwind("text-lg font-bold px-8")}>
            Última actividad
          </Text>
          <ActivitiesList />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Home;
