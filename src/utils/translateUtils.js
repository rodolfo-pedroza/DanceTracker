// translationUtils.js
import axios from "axios";

export const translateFoodName = async (
  foodName,
  sourceLanguage = "en",
  targetLanguage = "es"
) => {
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
