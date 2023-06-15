import React, { useState } from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import SuggestedCaloriesModal from "./SuggestedCaloriesModal";

const TotalSummary = ({ totals, suggestedCalories }) => {
  const tailwind = useTailwind();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  
  return (
    <View>
      <View
        style={tailwind("flex flex-row justify-center items-center py-2 px-8")}
      >
        <View style={tailwind("flex-1 flex-row justify-around")}>
          <View style={tailwind("bg-white rounded-2xl w-36")}>
            <Text
              style={tailwind(
                "text-base font-bold text-indigo-400 text-center"
              )}
            >
              {" "}
              {totals.totalCalories.toFixed(1)} cal
            </Text>
            <Text style={tailwind("text-sm text-center")}>Calorías totales</Text>
          </View>
          <View style={tailwind("bg-white rounded-2xl w-36")}>
            <View style={tailwind("flex flex-row justify-center items-center")}>
            <Text
              style={tailwind(
                "text-base font-bold text-indigo-400 text-center"
              )}
            >
              {" "}
              {suggestedCalories} cal
            </Text>
            <IconButton
              icon="help-circle-outline"
              iconColor="#818cf8"
              size={20}
              onPress={toggleModal}
              style={tailwind("-mt-1 -mb-1")}
            />
            </View>
            <Text style={tailwind("text-sm text-center")}>Calorías sugeridas</Text>
          </View>
        </View>
      </View>
      <View
        style={tailwind("flex flex-row justify-center items-center py-2 px-8")}
      >
        <View style={tailwind("flex-1 flex-row justify-around")}>
          <View style={tailwind("bg-white rounded-2xl w-24")}>
            <Text
              style={tailwind(
                "text-base font-bold text-indigo-400 text-center"
              )}
            >
              {" "}
              {totals.totalCarbohydrates.toFixed(1)} g
            </Text>
            <Text style={tailwind("text-sm text-center")}>Carbs</Text>
          </View>
          <View style={tailwind("bg-white rounded-2xl w-24")}>
            <Text
              style={tailwind(
                "text-base font-bold text-indigo-400 text-center"
              )}
            >
              {" "}
              {totals.totalFats.toFixed(1)} g
            </Text>
            <Text style={tailwind("text-sm text-center")}>Grasas</Text>
          </View>
          <View style={tailwind("bg-white rounded-2xl w-24")}>
            <Text
              style={tailwind(
                "text-base font-bold text-indigo-400 text-center"
              )}
            >
              {" "}
              {totals.totalProteins.toFixed(1)} g
            </Text>
            <Text style={tailwind("text-sm text-center")}>Proteínas</Text>
          </View>
        </View>
      </View>
      <SuggestedCaloriesModal
        isVisible={modalVisible}
        onClose={toggleModal}
      />
    </View>
  );
};

export default TotalSummary;
