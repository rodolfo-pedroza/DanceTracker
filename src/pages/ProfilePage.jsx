import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import { Avatar } from "react-native-paper";
import UserInfoCard from "../components/UserInfoCard";
import AccountCard from "../components/AccountCard";
import NotificationCard from "../components/NotificationCard";
import OthersCard from "../components/OthersCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

const ProfilePage = () => {
  const tailwind = useTailwind();
  const { user, logout } = useAuth();
  return (
    <ScrollView >
      <View style={tailwind("flex-row mt-4 px-8 items-center")}>
        <View>
          <Avatar.Image size={45} source={{ uri: user.photoURL }} />
        </View>
        <Text style={tailwind("text-lg font-bold ml-4")}>
          {user.displayName}
        </Text>
        <View style={tailwind("ml-8 p-2 bg-indigo-100 w-16 rounded-2xl")}>
          <TouchableOpacity onPress={() => logout()}>
            <Text style={tailwind("text-center")}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <UserInfoCard />
      <AccountCard />
      <NotificationCard />
      <OthersCard />
    </ScrollView>
  );
};

export default ProfilePage;
