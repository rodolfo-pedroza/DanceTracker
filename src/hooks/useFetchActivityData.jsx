import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchActivityData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, "userData", user.uid);
        const activityDataRef = collection(userDocRef, "activityData");

        const querySnapshot = await getDocs(activityDataRef);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
          setLoading(false);
          return;
        }

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setActivityData(data);
        setLoading(false);

        const unsubscribe = onSnapshot(activityDataRef, (snapshot) => {
          const updatedData = [];
          snapshot.forEach((doc) => {
            updatedData.push({ id: doc.id, ...doc.data() });
          });

          setActivityData(updatedData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [user]);

  return { activityData, loading };
};

export default useFetchActivityData;
