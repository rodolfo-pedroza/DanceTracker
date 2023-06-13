import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useTailwind } from "tailwind-rn";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDateTimePicker = ({
  isDatePickerVisible,
  setIsDatePickerVisible,
  selectedDate,
  setSelectedDate,
  setFieldValue,
}) => {
  const tailwind = useTailwind();

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setFieldValue("selectedDate", date);
    }
    setIsDatePickerVisible(false);
    // setIsDatePickerVisible(Platform.OS === "ios");
  };

  return (
    <View style={tailwind("flex-row justify-around items-center py-3")}>
      <View style={tailwind("p-2 -ml-4 bg-white rounded-lg w-52")}>
        <Text style={tailwind("text-lg ")}>Fecha de nacimiento:</Text>
      </View>
      <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
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
  );
};

export default CustomDateTimePicker;
