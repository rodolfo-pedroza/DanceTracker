import React from "react";
import { View, Text , TouchableOpacity} from "react-native";
import { Modal } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

const WarningModal = ({ visible, onDismiss, classification }) => {
  const tailwind = useTailwind();

  const getWarningMessage = (classification) => {
    const warningMessage =
      "Si tienes alguna lesión o condición física que pueda causarte una lesión al realizar las rutinas de baile, consulta a un médico antes de continuar.\n";

    switch (classification) {
      case "Bajo peso":
        return (
          warningMessage +
          "Tu peso está por debajo de lo normal. Por favor, consulta a un médico para obtener una orientación adecuada."
        );
      case "Normal":
        return (
          warningMessage + "Tu peso está dentro del rango normal. ¡Sigue así!"
        );
      case "Sobrepeso":
        return (
          warningMessage +
          "Tienes un peso superior al normal. Considera adoptar un estilo de vida más saludable."
        );
      case "Obesidad":
        return (
          warningMessage +
          "Te encuentras en el rango de obesidad. Por favor, consulta a un médico para obtener una orientación adecuada."
        );
      default:
        return warningMessage + "Clasificación desconocida.";
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={tailwind("bg-white p-4 rounded-lg mx-4")}
    >
      <Text style={tailwind("text-lg font-bold mb-4 text-indigo-500 text-center")}>🚫 Precaución 🚫</Text>
      <Text style={tailwind("text-base mb-4 text-center")}>
        {getWarningMessage(classification)}
      </Text>
      <View style={tailwind("flex justify-center items-center")} >
      <TouchableOpacity
        style={tailwind("bg-indigo-400 w-40 rounded-3xl py-2")}
        onPress={onDismiss}
      >
        <Text style={tailwind("text-white text-center font-bold")}>Entendido</Text>
      </TouchableOpacity>
    </View>
    </Modal>
  );
};

export default WarningModal;
