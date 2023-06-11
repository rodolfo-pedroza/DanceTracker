import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import LoggedFoodModal from "./LoggedFoodModal";

const styles = StyleSheet.create({
  roundedTop: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const MealComponent = ({ meal, onPress, foodItems, displayedDate }) => {
  const tailwind = useTailwind();

  const totalCalories = Math.ceil(foodItems.reduce((sum, item) => sum + item.calories, 0));
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodPress = (food) => {
    setSelectedFood(food);
    setShowModal(!showModal);
  };

  const FoodItem = ({ item }) => {
    return (
      <View style={tailwind("flex-row items-center justify-between my-2")}>
        <Text style={tailwind('text-base ')}>{item.food_name}</Text>
        <View style={tailwind("-mr-4")}>
        <IconButton 
          icon="chevron-up-circle-outline"
          size={24}
          style={tailwind("rounded-full ml-2")}
          onPress={() => handleFoodPress(item) }
          iconColor="#4338ca"
        />
        </View>
      </View>
    );
  };
  
  return (
    <View style={tailwind("flex my-2")}>
      <View style={tailwind("flex flex-row items-center")}>
        <View
          style={[tailwind(
            "flex-1 flex-row bg-blue-100 mx-2 p-1 items-center"
          ), styles.roundedTop]}
        >
          <View style={tailwind("flex-1 flex-row items-center")}>
            <Text style={tailwind("mx-2 text-base font-bold")}>{meal}</Text>
            <Text style={tailwind("mx-2 text-lg font-bold text-indigo-400")}>
              {totalCalories} cal
            </Text>
          </View>
          <TouchableOpacity onPress={onPress}>
            <IconButton
              icon="plus"
              size={20}
              style={tailwind("bg-indigo-300 rounded-full")}
              onPress={onPress}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tailwind("px-4 mx-2 bg-white")}>
        {foodItems.length > 0 ? (
          foodItems.map((item) => <FoodItem key={item.food_name} item={item} />)
        ) : (
          <View style={tailwind("flex flex-row justify-center items-center p-4")}>
            <Text style={tailwind("text-base font-bold text-gray-400")}>
              No hay alimentos registrados
            </Text>
          </View>
        )}
      </View>
      <LoggedFoodModal
        show={showModal}
        handleClose={() => setShowModal(null)}
        food={selectedFood}
        meal={meal}
        displayedDate={displayedDate}
      />
    </View>
  );
};

export default MealComponent;
