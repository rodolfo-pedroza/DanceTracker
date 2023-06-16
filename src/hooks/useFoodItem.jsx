import { useState, useEffect } from "react";
import axios from "axios";

const useFoodItem = (foodName, shouldFetch, setShouldFetch) => {
  const [foodItem, setFoodItem] = useState(null);

  console.log("useFoodItem: foodName: ", foodName);

  const translateFoodName = async (foodName, sourceLanguage = "es", targetLanguage = "en") => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDyQPjwFOdNKVWgXDV8s7isZ2ZwmWlLmd4`,
      {
        q: foodName,
        source: sourceLanguage,
        target: targetLanguage,
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating food name:", error.message);
    return foodName; // Return the original foodName if translation fails
  }
};


  useEffect(() => {
    const fetchFoodItem = async () => {
      if (foodName && shouldFetch) {
        console.log("useFoodItem: nixItemId: ", foodName);
        console.log("fetching food item: ", foodName);
        try {
          const translatedFoodName = await translateFoodName(foodName);
          console.log("Translated food name: ", translatedFoodName);

          const response = await axios.post(
            "https://trackapi.nutritionix.com/v2/natural/nutrients",
            { query: translatedFoodName },
            {
              headers: {
                "content-type": "application/json",
                "x-app-id": "22fe17bb",
                "x-app-key": "f26e1c92fa03a95f63cf98a6c6eb503e",
              },
            }
          );

          setFoodItem(response.data);
          setShouldFetch(false);
        } catch (error) {
          console.error("Error fetching food item: ", error.message);
        }
      }
    };

    fetchFoodItem();
  }, [foodName, shouldFetch, setShouldFetch]);

  return foodItem;
};

export default useFoodItem;
