import React, { memo, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/authContext.js";
import { useTailwind } from "tailwind-rn";
import { Avatar } from "react-native-paper";
import BMICard from "../components/BMICard.jsx";
import ActivitiesList from "../components/ActivitiesList.jsx";
import FitbitStatusCard from "../components/FitbitStatusCard.jsx";
import useProfileData from "../hooks/useProfileData.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

const Home = memo(({ navigation }) => {
  const { user, handleFitbitAuth, authToken, displayNameUpdated  } = useAuth();
  const tailwind = useTailwind();

  useEffect(() => {
    // This will force a re-render whenever displayNameUpdated changes
  }, [displayNameUpdated, user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={tailwind("flex-row px-8 justify-between")}>
          <View>
            <Text>Bienvenido</Text>
            <Text style={tailwind("text-lg font-bold")}>
              {user?.displayName}
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
        <View style={tailwind("flex-1 justify-center items-center")}>
          <View style={tailwind('flex-1 justify-center items-center bg-white rounded-3xl p-2.5 w-80')}>
            {authToken === null || !authToken ? (
              <TouchableOpacity
                style={tailwind("rounded-3xl p-2.5 w-48 bg-teal-500")}
                onPress={handleFitbitAuth}
              >
                <Text style={tailwind("text-sm text-white text-center")}>
                  Conectar Fitbit
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={tailwind("text-base font-bold text-green-400")}>
                Fitbit conectado
              </Text>
            )}
          </View>
        </View>
        <FitbitStatusCard />
        <View style={tailwind("flex-1 py-2 justify-center items-center")}>
          <View>
            <TouchableOpacity
              style={tailwind("rounded-3xl p-2.5 w-48 bg-purple-300")}
              onPress={() => navigation.navigate("RecommendationsPage")}
            >
              <Text style={tailwind("text-sm  text-center")}>
                Recomendar Actividad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={tailwind("text-lg font-bold px-8 my-2")}>Última actividad</Text>
        <ActivitiesList />
      </ScrollView>
    </SafeAreaView>
  );
});

export default Home;
