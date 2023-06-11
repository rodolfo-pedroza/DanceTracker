import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useFoodSearch from "../hooks/useFoodSearch.jsx";
import { IconButton } from "react-native-paper";
import useFoodItem from "../hooks/useFoodItem.jsx";
import { food } from "../data/food.js";
import Ingredient from "../components/Ingredient.jsx";
import FoodInformationModal from "../components/FoodInformationModal.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function SearchFoodPage({ route}) {
  const tailwind = useTailwind();
  const { meal, displayedDate: displayedDateString } = route.params;
  const displayedDate = new Date(displayedDateString);
  console.log(`displayedDate search: ${displayedDate}`);

  console.log(`meal: ${meal}`);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodName, setSelectedFoodName] = useState('');
  const [shouldFetchFoodItem, setShouldFetchFoodItem] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // const searchResults = food;
  const searchResults = useFoodSearch(searchQuery);
  // console.log(`searchResults: ${JSON.stringify(searchResults, null, 2)}`);


  const handleIngredientPress = (foodName) => {
    if (foodName) {
      setSelectedFoodName(foodName);
      setShouldFetchFoodItem(true);
      setIsModalVisible(true);
    } else {
      setSelectedFoodName(null);
      console.log("No food name provided");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const foodItem = useFoodItem(selectedFoodName, shouldFetchFoodItem, setShouldFetchFoodItem);
  const item = foodItem ? foodItem.foods[0] : null;
  // console.log(`item search: ${JSON.stringify(item, null, 2)}`);

  return (
    <View style={styles.container}>
      <View style={tailwind("px-8")}>
        <View
          style={tailwind(
            "flex flex-row justify-between bg-white rounded-3xl mb-4"
          )}
        >
          <View style={tailwind("")}>
            <IconButton icon="magnify" size={20} />
          </View>
          <TextInput
            style={tailwind("p-2 rounded w-full")}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            placeholder="Buscar alimento"
          />
        </View>
        <ScrollView>
          {searchResults.map((result) => (
            <Ingredient
              key={result.food_name || result.nix_item_id}
              name={result.food_name || result.brand_name}
              image={result.photo.thumb || result.foods[0].photo.thumb}
              showHorizontalScrollIndicator={false}
              nixItemId={result.food_name}
              onPress={handleIngredientPress}
            />
          ))}
        </ScrollView>
        <FoodInformationModal 
          show={isModalVisible}
          handleClose={handleModalClose}
          food={item}
          meal={meal}
          displayedDate={displayedDate}
        />
      </View>
    </View>
  );
}

export default SearchFoodPage;
