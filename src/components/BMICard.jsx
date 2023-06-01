import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import useFetchUserData from "../hooks/useFetchUserData";
import useFetchBmi from "../hooks/useFetchBmi";

function BmiCard(  ) {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user } = useAuth();

  const { userData, loading, fetchUserData } = useFetchUserData();
  const { bmi, classification, fetchBmi } = useFetchBmi(userData?.weight, userData?.height);

  
  useEffect(() => {
    fetchUserData();
  }, [user]);
  
  useEffect(() => {
    if (!loading && userData) {
      fetchBmi();      
    }
  }, [loading, userData]);
  
  const navigateToProfilePage = () => {
    navigation.navigate("UserDataPage");
  };

  return (
    <Card style={tailwind("px-4 mx-8 mt-4 rounded-3xl bg-indigo-100")}>
      <Card.Title title="IMC (Índice de masa corporal)" />
      {loading ? (
        <View style={tailwind('px-4 text-lg font-bold')}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {userData ? (
            <>
              <Text style={tailwind('px-4 mb-2 text-base ')}>Tienes un peso 
                <Text style={tailwind('text-indigo-400 text-lg font-bold')}> {classification} </Text>
              </Text>
              <Text style={tailwind('px-4 mb-2 text-sm')}>{userData.weight} kg </Text>
              <View style={tailwind()}>
                <TouchableOpacity
                  style={tailwind("rounded-3xl p-2.5 m-2 mb-4 w-28 bg-purple-300")}
                  onPress={navigateToProfilePage}
                >
                  <Text style={tailwind("text-center")}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
            <Text style={tailwind('px-4 mb-2 text-base font-bold')}>Por favor, complete su información</Text>
            <TouchableOpacity
              style={tailwind("rounded-3xl p-2.5 m-2 mb-4 w-28 bg-purple-300")}
              onPress={navigateToProfilePage}
            >
              <Text style={tailwind("text-center")}>Completar</Text>
            </TouchableOpacity>
            </>
          )}
        </>
      )}
    </Card>
  );
}


export default BmiCard;
