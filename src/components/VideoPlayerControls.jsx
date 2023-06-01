import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "../contexts/authContext";
import ActivityInfoModal from "./ActivityInfoModal";

const VideoPlayerControls = ({ className, togglePlayBack, status }) => {
  const tailwind = useTailwind();
  const { authToken } = useAuth();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  }, [startTime]);

  useEffect(() => {
    console.log('className', className)
    if (endTime !== null) {
      collectCaloriesBurned();
    }
  }, [endTime]);

  useEffect(() => {
    console.log("caloriesBurned", caloriesBurned);
  }, [caloriesBurned]);

  const handleButtonPress = () => {
    togglePlayBack();
    if (startTime === null) {
      setStartTime(Date.now());
    } else {
      const currentTime = Date.now();
      setEndTime(currentTime);
    }
  };

  const collectCaloriesBurned = async () => {
    const baseDate = new Date()
    baseDate.setHours(baseDate.getHours() - 5)
    const baseDateObj = baseDate.toISOString().split("T")[0];
    const detailLevel = "1min";
    const resource = "calories";
    const startTimeObj = new Date(startTime);
    const startTimeUrl = startTimeObj.toLocaleTimeString("en-US", {
      timeZone: "America/Mexico_City",
      hour12: false,
    });
    const endTimeObj = new Date(endTime);
    const endTimeUrl = endTimeObj.toLocaleTimeString("en-US", {
      timeZone: "America/Mexico_City",
      hour12: false,
    });
    const url = `https://api.fitbit.com/1/user/-/activities/${resource}/date/${baseDateObj}/1d/${detailLevel}/time/${startTimeUrl}/${endTimeUrl}.json`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("url", url);

    console.log("Response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);

      if (
        data["activities-calories"] &&
        data["activities-calories"].length > 0
      ) {
        const calories = data["activities-calories"][0];
        setDuration((endTime - startTime) / 60000);
        console.log("Duration", duration);
        setCaloriesBurned(calories.value);
      } else {
        console.log("No calories data aviailable");
      }
    } else {
      console.log("Error fetching data");
    }
  };

  const fetchActivity = async () => {
    collectCaloriesBurned();
    console.log('caloriesBurned', caloriesBurned)
    //store activity in database
  }

  const buttonText = startTime ?
    status.isPlaying ? "Pausar" : "Continuar" : "Comenzar";

  return (
    <>
      {startTime && !status.isPlaying && (
        <TouchableOpacity
          onPress={() => { setModalVisible(true); fetchActivity(); }}
          style={tailwind(
            "flex items-center my-2 p-4 rounded-full bg-indigo-300"
          )}
        >
          <Text style={tailwind("text-lg font-bold text-white")}>
            Terminar clase
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={handleButtonPress}
        style={tailwind("flex items-center p-4 rounded-full bg-indigo-300")}
      >
        <Text style={tailwind("text-lg font-bold text-white")}>
          {buttonText}
        </Text>
      </TouchableOpacity>
      <ActivityInfoModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        caloriesBurned={caloriesBurned}
        duration={duration}
        startTime={startTime}
        />
    </>
  );
};

export default VideoPlayerControls;
