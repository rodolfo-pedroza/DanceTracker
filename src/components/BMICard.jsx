import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import useFetchUserData from "../hooks/useFetchUserData";
import useProfileData from "../hooks/useProfileData";

function BmiCard(  ) {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user } = useAuth();

  const { userData, loading, fetchUserData } = useFetchUserData();
  const { isLoading, error, profileData } = useProfileData(user);

  console.log('profileData: ', profileData);
  console.log('userData: ', userData);

  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  
  const navigateToProfilePage = () => {
    navigation.navigate("UserDataPage");
  };

  return (
  <Card style={tailwind("px-4 mx-8 my-4 rounded-3xl bg-indigo-100")}>
    <Card.Title title="IMC (Índice de masa corporal)" />
    {isLoading ? (
      <View style={tailwind('px-4 text-lg font-bold')}>
        <Text>Loading Profile Data...</Text>
      </View>
    ) : (
      <>
        {loading ? (
          <View style={tailwind('px-4 text-lg font-bold')}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {userData && profileData ? (
              <>
                <Text style={tailwind('px-4 mb-2 text-base ')}>Su IMC es 
                  <Text style={tailwind('text-indigo-400 text-lg font-bold')}> {profileData.bmi} </Text>
                </Text>
                <Text style={tailwind('px-4 mb-2 text-sm ')}>Lo que indica que su peso esta en la categoría de
                  <Text style={tailwind('text-indigo-400 text-lg font-bold')}> {profileData.classification} </Text>
                </Text>
                {!userData || !profileData ? (
                  <View style={tailwind()}>
                    <TouchableOpacity
                      style={tailwind("rounded-3xl p-2.5 m-2 mb-4 w-28 bg-purple-300")}
                      onPress={navigateToProfilePage}
                    >
                      <Text style={tailwind("text-center")}>Actualizar</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
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
      </>
    )}
  </Card>
);

}

export default BmiCard;
