import { useTailwind } from "tailwind-rn";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";
import useDeleteFoodData from "../hooks/useDeleteFoodData";

const LoggedFoodModal = ({ show, handleClose, food, meal, displayedDate }) => {
  const tailwind = useTailwind();

  const deleteFoodData = useDeleteFoodData(food, meal, displayedDate);

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
                {food.food_name}
                {" ✨"}
              </Text>
            </View>
            <Text style={tailwind("text-center text-base m-2")}>
              Calorías:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {food.calories}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Carbohidratos:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {food.carbohydrates}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Proteínas:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {food.proteins}{" "}
              </Text>
            </Text>
            <Text style={tailwind("text-center text-base m-2")}>
              Grasas:
              <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
                {" "}
                {food.fats}{" "}
              </Text>
            </Text>
            <View style={tailwind("flex justify-center items-center")}>
              <TouchableOpacity
                style={tailwind("bg-indigo-400 rounded-3xl w-48 py-2 my-4")}
                onPress={() => {
                  deleteFoodData();
                  handleClose();
                }}
              >
                <Text
                  style={tailwind("text-white text-center text-lg font-bold")}
                >
                  Eliminar alimento
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={tailwind("text-center text-lg font-bold")}>
            No se encontró información del alimento
          </Text>
        )}
      </Modal>
    </Portal>
  );
};

export default LoggedFoodModal;
