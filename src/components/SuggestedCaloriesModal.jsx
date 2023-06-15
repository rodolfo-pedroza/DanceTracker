// SuggestedCaloriesModal.js
import React from "react";
import { Text } from "react-native";
import { Portal, Modal } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

const SuggestedCaloriesModal = ({ isVisible, onClose }) => {
  const tailwind = useTailwind();

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={tailwind("bg-white p-8 mx-4 rounded-xl")}
      >
        <Text style={tailwind("text-lg font-bold mb-4 text-indigo-500 text-center")}>📣 Aviso 📣</Text>
        <Text
            style={tailwind("text-base mb-4 text-center")}
        >
          Las calorías sugeridas son solo una recomendación. Consulte a un
          profesional para obtener una mejor orientación.
        </Text>
      </Modal>
    </Portal>
  );
};

export default SuggestedCaloriesModal;
