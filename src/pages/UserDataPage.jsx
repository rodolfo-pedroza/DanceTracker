import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Platform,
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
import useFetchBmiAndBmr from "../hooks/useFetchBmiAndBmr";

const ProfilePage = ({ navigation }) => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const [dataUpdatedModalVisible, setDataUpdatedModalVisible] = useState(false);
  const [genderValue, setGenderValue] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to control date picker visibility
  const [selectedDate, setSelectedDate] = useState(); // State to store selected date

  const [age, setAge] = useState(null); // State to store selected date

  const [userData, setUserData] = useState({
    age: null,
    dateOfBirth: null,
    genre: null,
    goalWeight: null,
    height: null,
    weight: null,
  });

  const { bmi, bmr, classification, fetchData } = useFetchBmiAndBmr(
    weightValue,
    heightValue,
    age,
    genderValue,
    (newBmi, newBmr, newClassification) => {
      setUserData((prevState) => ({
        ...prevState,
        bmi: newBmi,
        bmr: newBmr,
        classification: newClassification,
      }));
    }
  );


  useEffect(() => {
    if (selectedDate) {
      setAge(calculateAge());
    }
  }, [selectedDate]);

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      weight: weightValue,
    }));
  }, [weightValue]);

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      height: heightValue,
    }));
  }, [heightValue]);

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      goalWeight: goalWeightValue,
    }));
  }, [goalWeightValue]);

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      genre: genderValue,
    }));
  }, [genderValue]);

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

  const handleFormSubmit = async (
    weight,
    height,
    goalWeight,
    age,
    gender,
    selectedDate,
    user,
    setDataUpdatedModalVisible
  ) => {
    if (user) {
      const userId = user.uid;
      fetchData();
      // Check if bmi, bmr, and classification have values
      if (bmi !== null && bmr !== null && classification !== null) {
        try {
          const profileDataRef = collection(
            db,
            `userData/${userId}/profileData`
          );
          const updatedUserData = {
            weight,
            height,
            goalWeight,
            age,
            genre: gender,
            bmi,
            bmr,
            classification,
            dateOfBirth: selectedDate ? selectedDate.toDateString() : null,
            createdAt: new Date().toDateString(),
          };

          await addDoc(profileDataRef, updatedUserData);
          console.log("Document written with ID: ", profileDataRef.id);
          setDataUpdatedModalVisible(true);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        console.log("BMI, BMR, or Classification are missing.");
        console.log("BMI: ", bmi);
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
      </View>
      <SleepCard />
      <TouchableOpacity
        style={tailwind("rounded-full p-5 mx-8 mt-12 bg-indigo-300")}
        onPress={() =>
          handleFormSubmit(
            weightValue,
            heightValue,
            goalWeightValue,
            age,
            genderValue,
            selectedDate,
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
