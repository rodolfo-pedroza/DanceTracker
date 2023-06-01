import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import GoalsCard from "../components/GoalsCard";
import SleepCard from "../components/SleepCard";
import { Card, IconButton, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/authContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import DataUpdatedModal from "../components/DataUpdatedModal";


const onIconPress = () => {
  // activate text to recieve input
};

const handleFormSubmit = async (data, user, setDataUpdatedModalVisible ) => {
    if (user) {
        const userId = user.uid;
        try {
            const profileDataRef = collection(db, `userData/${userId}/profileData`);
            await addDoc(profileDataRef, data);
            console.log("Document written with ID: ", profileDataRef.id);
            setDataUpdatedModalVisible(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log("No user is logged in");
    }
};

const ProfilePage = ( navigation ) => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const [dataUpdatedModalVisible, setDataUpdatedModalVisible] = useState(false);

  return (
    <ScrollView>
      <GoalsCard icon="cog-outline" onIconPress={onIconPress} />
      <View style={tailwind("mx-8")}>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Tu peso"
              keyboardType="numeric"
              value={weightValue}
              onChangeText={(text) => setWeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="scale-bathroom" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>KG</Text>
          </View>
        </View>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Tu estatura"
              keyboardType="numeric"
              value={heightValue}
              onChangeText={(text) => setHeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="human-male-height" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>CM</Text>
          </View>
        </View>
        <View style={tailwind("flex-row justify-between items-center py-3")}>
          <View style={tailwind("w-72")}>
            <TextInput
              placeholder="Peso a alcanzar"
              keyboardType="numeric"
              value={goalWeightValue}
              onChangeText={(text) => setGoalWeightValue(text)}
              mode="flat"
              left={<TextInput.Icon icon="scale-bathroom" />}
              style={tailwind("bg-gray-200 rounded-2xl")}
            />
          </View>
          <View style={tailwind("bg-blue-300  p-3.5 rounded-2xl")}>
            <Text style={tailwind("text-sm text-white")}>KG</Text>
          </View>
        </View>
      </View>
      <SleepCard />
      <TouchableOpacity
        style={tailwind("rounded-full p-5 mx-8 mt-12 bg-indigo-300")}
        onPress={() =>
          handleFormSubmit({
            weight: weightValue,
            height: heightValue,
            goalWeight: goalWeightValue,
          }, 
            user,
            setDataUpdatedModalVisible, 
          )
        }
      >
        <Text style={tailwind("text-lg text-white text-center font-bold")}>
          Fijar
        </Text>
      </TouchableOpacity>
      <DataUpdatedModal
        visible={dataUpdatedModalVisible}
        hideModal={() => setDataUpdatedModalVisible(false)}
        />
    </ScrollView>
  );
};

export default ProfilePage;
