import React, { useState } from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

const registerActivity = async (caloriesBurned, duration, startTime, user, title) => {
  if (user) {
    const userId = user.uid;
    try {
      const activityDataRef = collection(db, `userData/${userId}/activityData`);
      await addDoc(activityDataRef, {
        caloriesBurned,
        duration,
        startTime,
        title,
      });
      console.log("Document written with ID: ", activityDataRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  } else {
    console.log("No user is logged in");
    return false;
  }
};

const ActivityInfoModal = ({
  visible,
  hideModal,
  caloriesBurned,
  duration,
  startTime,
  title,
}) => {
  const { user } = useAuth();
  const tailwind = useTailwind();
  const baseDate = new Date(startTime);
  baseDate.setHours(baseDate.getHours() - 5);
  const baseDateObj = baseDate.toISOString().split("T")[0];
  const roundedDuration = duration.toFixed(1);


  const [registered , setActivityRegistered] = useState(false);

  const handleRegisterActivity = async () => {
    const registered  = await registerActivity(
      caloriesBurned,
      roundedDuration,
      baseDateObj,
      user,
      title
    );
    if (registered ) {
      setActivityRegistered(true);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={tailwind("bg-white mx-8 rounded-3xl py-12")}
      >
        <Text style={tailwind("text-center text-lg font-bold")}>
          Resumen de actividad
        </Text>
        <Text style={tailwind("text-center text-sm mt-2")}>
          Durante la {title}
        </Text>
        <Text style={tailwind("text-center text-sm mt-2")}>
          Quemaste
          <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
            {" "}
            {caloriesBurned}{" "}
          </Text>
          calorías
        </Text>
        <Text style={tailwind("text-center text-sm mt-2")}>
          Te ejercitaste durante
          <Text style={tailwind("text-indigo-400 text-lg font-bold")}>
            {" "}
            {roundedDuration}{" "}
          </Text>
          min
        </Text>
        {registered  ? (
          <Text style={tailwind("text-center text-lg mt-2 text-green-500")}>
            Actividad registrada correctamente
          </Text>
        ) : (
          <Button
            style={tailwind("mt-4 bg-indigo-300 rounded-3xl px-4 py-2 mx-8")}
            onPress={handleRegisterActivity}
          >
            <Text style={tailwind("font-bold text-sm text-white")}>
              Registrar Actividad
            </Text>
          </Button>
        )}
      </Modal>
    </Portal>
  );
};

export default ActivityInfoModal;
