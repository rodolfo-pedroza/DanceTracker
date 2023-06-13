import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchActivityData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const userDocRef = doc(db, "userData", user.uid);
    const activityDataRef = collection(userDocRef, "activityData");

    const unsubscribe = onSnapshot(activityDataRef, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setActivityData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { activityData, loading };
};

export default useFetchActivityData;
