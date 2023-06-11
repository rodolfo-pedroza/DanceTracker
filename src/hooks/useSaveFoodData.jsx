import { useState, useEffect } from "react";
import { collection, doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext.js";

const useSaveFoodData = (foodData, meal, displayedDate) => {
  const { user } = useAuth();
  const userId = user.uid;
  const [saveData, setSaveData] = useState(false);
  console.log('displayedDate hook', displayedDate)

  useEffect(() => {
    if (!saveData) return;

    const saveFoodDataToFirestore = async () => {
      try {
        const userDocRef = doc(db, "userData", userId);
        const dateString = `${displayedDate.getFullYear()}-${displayedDate.getMonth() + 1}-${displayedDate.getDate()}`;

        const foodLogsCollectionRef = collection(userDocRef, "foodLogs");
        const dateDocRef = doc(foodLogsCollectionRef, dateString);
        await setDoc(dateDocRef, { [meal]: { foods: arrayUnion(foodData) } }, { merge: true });
      } catch (error) {
        console.error("Error saving food data to Firestore:", error);
      }
    };

    saveFoodDataToFirestore();
    setSaveData(false);
  }, [saveData, foodData, meal, userId, displayedDate]);

  return () => setSaveData(true);
};

export default useSaveFoodData;
