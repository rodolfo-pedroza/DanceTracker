import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import MealComponent from "../components/MealComponent.jsx";
import { useNavigation } from "@react-navigation/native";
import useFetchFoodData from "../hooks/useFetchFoodData.jsx";
import TotalSummary from "../components/TotalSummary.jsx";
import { calculateTotals, extractMealItems } from "../utils/foodTrackerUtils.js";
import DateNavigation from "../components/DateNavigation.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function FoodTracker() {
  const tailwind = useTailwind();
  const navitation = useNavigation();

  const currentDate = new Date();
  const [displayedDate, setDisplayedDate] = useState(currentDate);
  const { foodData, loading } = useFetchFoodData(displayedDate);
  console.log('foodData', foodData)

  const { breakfastItems, lunchItems, dinnerItems, snackItems } = extractMealItems(foodData);

  const [totals, setTotals] = useState({
    totalCalories: 0,
    totalCarbohydrates: 0,
    totalFats: 0,
    totalProteins: 0,
  });

  useEffect(() => {
    setTotals(calculateTotals(foodData));
  }, [foodData]);

  const handleMealPress = (meal) => {
    navitation.navigate("SearchFoodPage", { meal, displayedDate: displayedDate.toISOString() })
  }; 

  const handlePevDate = () => {
    const prevDate = new Date(displayedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setDisplayedDate(prevDate);
    console.log('newDate', displayedDate)
  };
  
  const handleNextDate = () => {
    const nextDate = new Date(displayedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setDisplayedDate(nextDate);
    console.log('newDate', displayedDate)
  };

  if (loading) {
    return (
      <View style={[styles.container, tailwind("justify-center items-center")]}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <DateNavigation 
          displayedDate={displayedDate}
          onPrevDate={handlePevDate}
          onNextDate={handleNextDate}
        />
        <TotalSummary totals={totals} suggestedCalories={2000} />
        <View style={tailwind("flex-1 px-8 py-2")}>
          <MealComponent
            meal="Desayuno"
            onPress={() => handleMealPress("Desayuno")}
            foodItems={breakfastItems}
            displayedDate={displayedDate}
          />
          <MealComponent
            meal="Comida"
            onPress={() => handleMealPress("Comida")}
            foodItems={lunchItems}
            displayedDate={displayedDate}
          />
          <MealComponent
            meal="Cena"
            onPress={() => handleMealPress("Cena")}
            foodItems={dinnerItems}
            displayedDate={displayedDate}
          />
          <MealComponent
            meal="Snack"
            onPress={() => handleMealPress("Snack")}
            foodItems={snackItems}
            displayedDate={displayedDate}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default FoodTracker;
