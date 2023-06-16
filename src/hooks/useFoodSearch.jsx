import { useState, useEffect } from "react";
import axios from "axios";

const useFoodSearch = (query) => {
  const [searchResults, setSearchResults] = useState([]);

  const translateText = async (text, targetLanguage = "es") => {
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDyQPjwFOdNKVWgXDV8s7isZ2ZwmWlLmd4`,
        {
          q: text,
          target: targetLanguage,
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating text:", error.message);
      return text;
    }
  };

  const translateQueryToEnglish = async (
    query,
    sourceLanguage = "es",
    targetLanguage = "en"
  ) => {
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDyQPjwFOdNKVWgXDV8s7isZ2ZwmWlLmd4`,
        {
          q: query,
          source: sourceLanguage,
          target: targetLanguage,
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating query:", error.message);
      return query;
    }
  };

  useEffect(() => {
    if (query) {
      const fetchRecipes = async () => {
        try {
          const translatedQuery = await translateQueryToEnglish(query);
          console.log(`translatedQuery: ${translatedQuery}`);
          const ingredientsResponse = await axios.get(
            "https://trackapi.nutritionix.com/v2/search/instant",
            {
              headers: {
                "x-app-id": "22fe17bb",
                "x-app-key": "f26e1c92fa03a95f63cf98a6c6eb503e",
              },
              params: { query:translatedQuery  },
            }
          );

          const translatedResults = await Promise.all(
            ingredientsResponse.data.common.map(async (result) => {
              const translatedName = await translateText(result.food_name);
              return { ...result, food_name: translatedName };
            })
          );

          setSearchResults(translatedResults);
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
