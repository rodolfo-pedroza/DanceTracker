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
import ActivityCard from "../components/ActivityCard.jsx";
import CaloriesCard from "../components/CaloriesCard.jsx";
import GoalsCard from "../components/GoalsCard.jsx";
import ActivitiesList from "../components/ActivitiesList.jsx";
import FitbitAuthConnect from "../components/FibitAuthConnect.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function Home({ navigation }) {
  const { user, logout, loading, authToken, handleFitbitAuth } = useAuth();
  const tailwind = useTailwind();
  // console.log(user);

  const activities = [
    {
      name: "Caminar",
      duration: "1h",
      calories: "200 kcal",
    },
    {
      name: "Correr",
      duration: "30 min",
      calories: "300 kcal",
    },
    {
      name: "Ciclismo",
      duration: "1h",
      calories: "500 kcal",
    },
    {
      name: "Natación",
      duration: "1h",
      calories: "300 kcal",
    },
  ];

  const goalsOnPress = () => {
    navigation.navigate("UserDataPage");
  };

  const logAuth = () => {
    console.log(authToken);
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
          <ActivityCard />
          <CaloriesCard />
          <GoalsCard icon="plus" onIconPress={goalsOnPress} />
          <Text style={tailwind("text-lg font-bold px-8")}>
            Última actividad
          </Text>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {authToken ? (
              <Text>Fitbit Conectado {authToken}</Text>
            ) : (
              <>
              
              <Button title="Authorize Fitbit" onPress={handleFitbitAuth} />
              <Button title="authToken" onPress={logAuth} />
              </>
            )}
          </View>
          <ActivitiesList activities={activities} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Home;
