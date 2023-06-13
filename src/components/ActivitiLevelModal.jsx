import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useTailwind } from "tailwind-rn";

const ActivityLevelModal = ({ visible, setVisible, setActivityLevel, setFieldValue }) => {
  const tailwind = useTailwind();

  const activityLevels = [
    {
      level: "sedentary",
      spanishText: "Sedentario",
      description: "Mínimo o ningún ejercicio",
    },
    {
      level: "lightly_active",
      spanishText: "Ligeramente activo",
      description: "Ejercicio ligero o deportes 1-3 días a la semana",
    },
    {
      level: "moderately_active",
      spanishText: "Moderadamente activo",
      description: "Ejercicio moderado o deportes 3-5 días a la semana",
    },
    {
      level: "very_active",
      spanishText: "Muy activo",
      description: "Ejercicio intenso o deportes 6-7 días a la semana",
    },
    {
      level: "extremely_active",
      spanishText: "Extremadamente activo",
      description: "Ejercicio muy intenso o trabajo físico",
    },
  ];

  const handleSelectActivityLevel = (level) => {
    setFieldValue("activityLevel", level)
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={tailwind("flex-1 justify-center items-center")}>
        <View style={tailwind("bg-white rounded-lg p-4 w-4/5")}>
          <Text style={tailwind("text-lg font-bold mb-4 text-center")}>
            ¿Cuál es su nivel de actividad física?
          </Text>
          {activityLevels.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={tailwind("bg-blue-500/75 p-2 rounded-lg my-2 border-solid border-2 border-blue-800")}
              onPress={() => handleSelectActivityLevel(activity.level)}
            >
              <Text style={tailwind("text-white text-left text-lg font-bold")}>
                {activity.spanishText}
              </Text>
              <Text style={tailwind("text-sm font-semibold text-justify ")}>
                {activity.description}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={tailwind("mt-4 bg-indigo-400 p-2 rounded-full")}
            onPress={() => setVisible(false)}
          >
            <Text style={tailwind("text-white text-base font-bold text-center")}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityLevelModal;
