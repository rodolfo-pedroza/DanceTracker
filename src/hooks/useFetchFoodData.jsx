import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext.js";

const useFetchFoodData = (date) => {
  const { user } = useAuth();
  const userId = user.uid;
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFoodDataFromFirestore = () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "userData", userId);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        console.log('dateString', dateString)

        const foodLogsCollectionRef = collection(userDocRef, "foodLogs");
        const dateDocRef = doc(foodLogsCollectionRef, dateString);

        const unsubscribe = onSnapshot(dateDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setFoodData({ id: docSnapshot.id, ...docSnapshot.data() });
          } else {
            console.log("No such document!");
            setFoodData({})
          }
          setLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching food data from Firestore:", error);
        setLoading(false);
      }
    };

    const unsubscribe = fetchFoodDataFromFirestore();
    return () => unsubscribe();
  }, [userId, date]);

  return { foodData, loading };
};

export default useFetchFoodData;
