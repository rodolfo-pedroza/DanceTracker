import { useState, useEffect } from "react";
import axios from "axios";

const useFoodSearch = (query) => {
  const [searchResults, setSearchResults] = useState([]);

  console.log("useFoodSearch called");

  useEffect(() => {
    if (query) {
      const fetchRecipes = async () => {
        try {
          const ingredientsResponse = await axios.get(
            "https://trackapi.nutritionix.com/v2/search/instant",
            {
              headers: {
                "x-app-id": '22fe17bb',
                "x-app-key": 'f26e1c92fa03a95f63cf98a6c6eb503e',
              },
              params: { query },
            }
          );
          setSearchResults([
            ...ingredientsResponse.data.common,
          ]);
        } catch (error) {
          console.error("Error fetching recipes: ", error.message);
        }
      };
      fetchRecipes();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return searchResults;
};

export default useFoodSearch;
