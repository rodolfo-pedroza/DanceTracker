import { useState, useEffect } from "react";
import axios from "axios";

const useFoodItem = (foodName, shouldFetch, setShouldFetch) => {
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    const fetchFoodItem = async () => {
      if (foodName && shouldFetch) {
        console.log("useFoodItem: nixItemId: ", foodName);
        console.log("fetching food item: ", foodName);
        try {
          const response = await axios.post(
            "https://trackapi.nutritionix.com/v2/natural/nutrients",
            { query: foodName},
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
