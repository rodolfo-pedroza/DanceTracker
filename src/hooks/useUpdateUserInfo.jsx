import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { differenceInYears } from "date-fns";

export const useUpdateUserInfo = (user) => {
  const [dataUpdatedModalVisible, setDataUpdatedModalVisible] = useState(false);

  const calculateAge = (selectedDate) => {
    if (selectedDate) {
      const currentDate = new Date();
      return differenceInYears(currentDate, selectedDate);
    }
    return null;
  };

  const updateUserInfo = async (
    weight,
    height,
    goalWeight,
    gender,
    selectedDate
  ) => {
    if (user) {
      const userId = user.uid;
      try {
        const profileDataRef = collection(
          db,
          `userData/${userId}/profileData`
        );
        const updatedUserData = {
          weight,
          height,
          goalWeight,
          age: calculateAge(selectedDate),
          genre: gender,
          dateOfBirth: selectedDate ? selectedDate.toISOString() : null,
          createdAt: new Date().toISOString(),
        };

        await addDoc(profileDataRef, updatedUserData);
        console.log("Document written with ID: ", profileDataRef.id);
        setDataUpdatedModalVisible(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("No user is logged in");
    }
  };

  return {
    dataUpdatedModalVisible,
    setDataUpdatedModalVisible,
    updateUserInfo,
  };
};

export default useUpdateUserInfo;