import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import DataUpdatedModal from "../components/DataUpdatedModal";
import useUpdateUserInfo from "../hooks/useUpdateUserInfo";
import WeightHeightInputs from "../components/WeightHeightInputs";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import GenderButtons from "../components/GenderButtons";
import ActivityLevelModal from "../components/ActivitiLevelModal";
import useCalculateStats from "../hooks/useCalculateStats";
import { calculateAge } from "../utils/UserDataPageUtils";
import { Formik } from "formik";
import { userInfoValidationSchema } from "../validationSchemas/userInfo";

const initialValues = {
  weightValue: "",
  heightValue: "",
  goalWeightValue: "",
  genderValue: "",
  selectedDate: "",
  activityLevel: "",
};

const UserDataPage = () => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState("");
  const [goalWeightValue, setGoalWeightValue] = useState("");
  const [genderValue, setGenderValue] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const [activityLevel, setActivityLevel] = useState("");
  const [activityLevelModalVisible, setActivityLevelModalVisible] =
    useState(false);

  const { isLoading, error, calculateStats } = useCalculateStats(user);

  const {
    dataUpdatedModalVisible,
    setDataUpdatedModalVisible,
    updateUserInfo,
  } = useUpdateUserInfo(user);

  const handleFormSubmit = async (values) => {
    const {
      weightValue,
      heightValue,
      goalWeightValue,
      genderValue,
      selectedDate,
      activityLevel,
    } = values;

    await updateUserInfo(
      weightValue,
      heightValue,
      goalWeightValue,
      genderValue,
      selectedDate,
      activityLevel
    );

    await calculateStats(
      calculateAge(selectedDate),
      genderValue,
      activityLevel,
      parseFloat(weightValue),
      parseFloat(heightValue),
      parseFloat(goalWeightValue)
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={userInfoValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <ScrollView>
          <View style={tailwind("mx-8 mt-2")}>
            <WeightHeightInputs
              value={values.weightValue}
              onChangeText={handleChange("weightValue")}
              placeholder="Tu peso"
              icon="scale-bathroom"
            />
            {touched.weightValue && errors.weightValue && (
              <Text style={tailwind("text-red-500 text-xs text-center -mt-2")}>
                {errors.weightValue}
              </Text>
            )}
            <WeightHeightInputs
              value={values.heightValue}
              onChangeText={handleChange("heightValue")}
              placeholder="Tu estatura"
              icon="human-male-height"
            />
            {touched.heightValue && errors.heightValue && (
              <Text style={tailwind("text-red-500 text-xs text-center -mt-2")}>
                {errors.heightValue}
              </Text>
            )}
            <WeightHeightInputs
              value={values.goalWeightValue}
              onChangeText={handleChange("goalWeightValue")}
              placeholder="Peso a alcanzar"
              icon="scale-bathroom"
            />
            {touched.goalWeightValue && errors.goalWeightValue && (
              <Text style={tailwind("text-red-500 text-xs text-center -mt-2")}>
                {errors.goalWeightValue}
              </Text>
            )}
            <CustomDateTimePicker
              isDatePickerVisible={isDatePickerVisible}
              setIsDatePickerVisible={setDatePickerVisible}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setFieldValue={setFieldValue}
            />
            {touched.selectedDate && errors.selectedDate && (
              <Text style={tailwind("text-red-500 text-xs text-center -mt-2")}>
                {errors.selectedDate}
              </Text>
            )}
            <GenderButtons
              genderValue={genderValue}
              setGenderValue={setGenderValue}
              setFieldValue={setFieldValue}
            />
            {touched.genderValue && errors.genderValue && (
              <Text style={tailwind("text-red-500 text-xs text-center -mt-2")}>
                {errors.genderValue}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={tailwind("rounded-xl p-3 mx-8 mt-2 bg-blue-300")}
            onPress={() => setActivityLevelModalVisible(true)}
          >
            <Text
              style={tailwind("text-white text-base font-bold text-center")}
            >
              ¿Cuál es su nivel de actividad física?
            </Text>
          </TouchableOpacity>
          {touched.activityLevel && errors.activityLevel && (
            <Text style={tailwind("text-red-500 text-xs text-center")}>
              {errors.activityLevel}
            </Text>
          )}
          <TouchableOpacity
            style={tailwind("rounded-full p-4 mx-8 mt-12 bg-indigo-300")}
            onPress={handleSubmit}
          >
            <Text style={tailwind("text-white text-lg font-bold text-center")}>
              Actualizar
            </Text>
          </TouchableOpacity>
          <ActivityLevelModal
            visible={activityLevelModalVisible}
            setVisible={setActivityLevelModalVisible}
            setActivityLevel={setActivityLevel}
            setFieldValue={setFieldValue}
          />
          <DataUpdatedModal
            visible={dataUpdatedModalVisible}
            setVisible={setDataUpdatedModalVisible}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

export default UserDataPage;
