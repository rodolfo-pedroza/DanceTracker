import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import DataUpdatedModal from "../components/DataUpdatedModal";
import useUpdateUserInfo from "../hooks/useUpdateUserInfo";
import WeightHeightInputs from "../components/WeightHeightInputs";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import GenderButtons from "../components/GenderButtons";
;

const UserDataPage = () => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const [genderValue, setGenderValue] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const {
    dataUpdatedModalVisible,
    setDataUpdatedModalVisible,
    updateUserInfo,
  } = useUpdateUserInfo(user);

  const handleFormSubmit = () => {
    updateUserInfo(
      weightValue,
      heightValue,
      goalWeightValue,
      genderValue,
      selectedDate
    );
  };

  return (
    <ScrollView>
      <View style={tailwind("mx-8 mt-2")}>
        <WeightHeightInputs
          value={weightValue}
          onChangeText={(text) => setWeightValue(text)}
          placeholder="Tu peso"
          icon="scale-bathroom"
        />
        <WeightHeightInputs
          value={heightValue}
          onChangeText={(text) => setHeightValue(text)}
          placeholder="Tu estatura"
          icon="human-male-height"
        />
        <WeightHeightInputs
          value={goalWeightValue}
          onChangeText={(text) => setGoalWeightValue(text)}
          placeholder="Peso a alcanzar"
          icon="scale-bathroom"
        />
        <CustomDateTimePicker
          isDatePickerVisible={isDatePickerVisible}
          setIsDatePickerVisible={setDatePickerVisible}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <GenderButtons
          genderValue={genderValue}
          setGenderValue={setGenderValue}
        />
      </View>
      <TouchableOpacity
        style={tailwind("rounded-full p-5 mx-8 mt-12 bg-indigo-300")}
        onPress={handleFormSubmit}
      >
        <Text style={tailwind("text-white text-center")}>Actualizar</Text>
      </TouchableOpacity>
      <DataUpdatedModal
        visible={dataUpdatedModalVisible}
        setVisible={setDataUpdatedModalVisible}
      />
    </ScrollView>
  );
};

export default UserDataPage;
