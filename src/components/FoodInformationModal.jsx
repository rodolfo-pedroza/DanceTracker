import { useTailwind } from "tailwind-rn";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";
import useSaveFoodData from "../hooks/useSaveFoodData";

const FoodInformationModal = ({ show, handleClose, food, meal, displayedDate}) => {
  const tailwind = useTailwind();

  console.log(`displayedDate savemodal: ${displayedDate}`);
  // const item = food ? food.foods[0] : null;

  const newFoodObject = food
    ? {
        food_name: food.food_name,
        calories: food.nf_calories,
        carbohydrates: food.nf_total_carbohydrate,
        fats: food.nf_total_fat,
        proteins: food.nf_protein,
      }
    : null;

  const triggerSaveData = useSaveFoodData(newFoodObject, meal, displayedDate);

  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={handleClose}
        contentContainerStyle={tailwind("bg-white mx-8 rounded-3xl py-12")}
      >
        {food ? (
          <>
            <Text
              style={tailwind(
                "text-center text-xl font-bold text-indigo-400 py-4"
              )}
            >
              Información de alimento
            </Text>
            <View style={tailwind("flex flex-row justify-center items-center")}>
              <Text style={tailwind("text-center text-lg font-bold ")}>
                {"✨ "}
                {newFoodObject.food_name}
                {" ✨"}
              </Text>
            </View>
            <Text style={tailwind("text-center text-base m-2")}>
              Calorías:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {newFoodObject.calories}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Carbohidratos:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {newFoodObject.carbohydrates}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Grasas:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {newFoodObject.fats}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Proteínas:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {newFoodObject.proteins}{" "}
              </Text>
            </Text>
            <View style={tailwind("flex justify-center items-center")}>
              <TouchableOpacity
                style={tailwind("bg-indigo-400 rounded-3xl w-48 py-2 my-4")}
                onPress={() => {
                  triggerSaveData();
                  handleClose();
                }}
              >
                <Text
                  style={tailwind("text-base text-center text-white font-bold")}
                >
                  Agregar alimento
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={tailwind("text-center text-lg font-bold")}>
            Loading...
          </Text>
        )}
      </Modal>
    </Portal>
  );
};

export default FoodInformationModal;
