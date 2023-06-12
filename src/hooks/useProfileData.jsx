import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useProfileData = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const profileDataRef = doc(db, `userData/${userId}/stats/profileData`);

      const unsubscribe = onSnapshot(
        profileDataRef,
        (snapshot) => {
          setProfileData(snapshot.data());
          setIsLoading(false);
        },
        (err) => {
          setError(err);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return {
    isLoading,
    error,
    profileData,
  };
};

export default useProfileData;
