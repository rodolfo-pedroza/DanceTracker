import React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { useTailwind } from "tailwind-rn";

const DataUpdatedModal = ({ visible, setVisible }) => { // Change the prop name here
    const tailwind = useTailwind();
    return (
        <Portal>
            <Modal visible={visible} onDismiss={setVisible} contentContainerStyle={tailwind("bg-white rounded-2xl p-4")}>
            <Text style={tailwind("text-center text-lg font-bold")}>Datos actualizados</Text>
            <Text style={tailwind("text-center text-sm mt-2")}>Tus datos se han actualizado correctamente</Text>
            <Button style={tailwind("mt-4")} onPress={() => setVisible(false)}>Cerrar</Button> 
            </Modal>
        </Portal>
    );
}

export default DataUpdatedModal;
