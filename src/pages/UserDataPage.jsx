import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import GoalsCard from "../components/GoalsCard";
import SleepCard from "../components/SleepCard";
import { Card, IconButton, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/authContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import DataUpdatedModal from "../components/DataUpdatedModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { differenceInYears } from "date-fns";

const ProfilePage = (navigation) => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const [dataUpdatedModalVisible, setDataUpdatedModalVisible] = useState(false);
  const [genderValue, setGenderValue] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to control date picker visibility
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    setDatePickerVisible(Platform.OS === "ios"); // Hide the date picker on iOS after selection
  };

  const calculateAge = () => {
    if (selectedDate) {
      const currentDate = new Date();
      return differenceInYears(currentDate, selectedDate);
    }
    return null;
  };

  const handleFormSubmit = async (data, user, setDataUpdatedModalVisible) => {
    if (user) {
      const userId = user.uid;
      try {
        const profileDataRef = collection(db, `userData/${userId}/profileData`);
        const age = calculateAge();
        const newData = {
          ...data,
          age: age,
          genre: genderValue,
          dateOfBirth: selectedDate ? selectedDate.toDateString() : null,
        };
        await addDoc(profileDataRef, newData);
        console.log("Document written with ID: ", profileDataRef.id);
        setDataUpdatedModalVisible(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("No user is logged in");
    }
  };

  return (
    <ScrollView>
      <View style={tailwind("m-8")}>
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
        {/* <View style={tailwind("flex-row justify-between items-center py-3")}>
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
        </View> */}
        <View style={tailwind("flex-row justify-around items-center py-3")}>
          <View
            style={tailwind("flex-1 flex-row justify-around items-center ")}
          >
            <Text style={tailwind("text-lg ")}>Femenino</Text>
            <View
              style={[
                tailwind("bg-white rounded-2xl"),
                genderValue === "female" &&
                  tailwind("bg-fuchsia-200 rounded-2xl"),
              ]}
            >
              <IconButton
                icon="gender-female"
                size={30}
                onPress={() => setGenderValue("female")}
              />
            </View>
          </View>
          <View
            style={tailwind("flex-1 flex-row justify-around items-center ")}
          >
            <Text style={tailwind("text-lg ")}>Masculino</Text>
            <View
              style={[
                tailwind("bg-white rounded-2xl"),
                genderValue === "male" && tailwind("bg-blue-200 rounded-2xl"),
              ]}
            >
              <IconButton
                icon="gender-male"
                size={30}
                onPress={() => setGenderValue("male")}
              />
            </View>
          </View>
        </View>
        <View style={tailwind("flex-row justify-around items-center py-3")}>
          <View style={tailwind("p-2 -ml-4 bg-white rounded-lg w-52")}>
            <Text style={tailwind("text-lg ")}>Fecha de nacimiento:</Text>
          </View>
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <Text>
              {selectedDate ? selectedDate.toDateString() : "Seleccionar "}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateSelect}
            />
          )}
        </View>
      </View>
      <SleepCard />
      <TouchableOpacity
        style={tailwind("rounded-full p-5 mx-8 mt-12 bg-indigo-300")}
        onPress={() =>
          handleFormSubmit(
            {
              weight: weightValue,
              height: heightValue,
              goalWeight: goalWeightValue,
            },
            user,
            setDataUpdatedModalVisible
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
