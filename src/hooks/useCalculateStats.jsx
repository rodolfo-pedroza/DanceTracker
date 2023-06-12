import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useCalculateStats = (user) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateStats = async (age, gender, activity, weight, height, goalWeight) => {
    setIsLoading(true);
    setError(null);

    console.log("user info", age,gender,activity,weight,height,goalWeight )

    try {
      const response = await fetch("https://bmi-bmr-calculator-cirt52yvla-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          gender,
          activity,
          weight,
          height,
          goal_weight: goalWeight,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API response data", data);

      if (user) {
        const userId = user.uid;
        const profileDataRef = doc(db, `userData/${userId}/stats/profileData`);
        await setDoc(profileDataRef, data, { merge: true });

        console.log("Stats added to profileData");
      } else {
        console.log("No user is logged in");
      }
    } catch (err) {
      console.error("Error in calculateStats:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    calculateStats,
  };
};

export default useCalculateStats;
