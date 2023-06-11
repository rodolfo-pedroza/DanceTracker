import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { arrayRemove, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useDeleteFoodData = (foodData, meal, displayedDate) => {
  const { user } = useAuth();
  const userId = user.uid;
  const [deleteData, setDeleteData] = useState(false);

  useEffect(() => {
    if (!deleteData) return;

    const deleteFoodDataFromFirestore = async () => {
      try {
        const userDocRef = doc(db, "userData", userId);
        const date = new Date();
        const dateString = `${displayedDate.getFullYear()}-${displayedDate.getMonth() + 1}-${displayedDate.getDate()}`;

        const foodLogsCollectionRef = collection(userDocRef, "foodLogs");
        const dateDocRef = doc(foodLogsCollectionRef, dateString);
        await setDoc(dateDocRef, { [meal]: { foods: arrayRemove(foodData) } }, { merge: true });
      } catch (error) {
        console.error("Error deleting food data from Firestore:", error);
      }
    };

    deleteFoodDataFromFirestore();
    setDeleteData(false);
  }, [deleteData, foodData, meal, userId, displayedDate]);

  return () => setDeleteData(true);
};

export default useDeleteFoodData;