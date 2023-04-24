import { useField } from "formik";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
    },
});

const SelectInput = ({ name, options, placeholder, ...props }) => {

    const [field, meta, helpers] = useField(name);
    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <View>
            <TextInput
                mode='outlined'
                editable={false}
                right={<TextInput.Icon 
                    icon='menu-down' 
                    onPress={() => {
                        setShowDropdown(!showDropdown)
                    }}
                    />}
                left={<TextInput.Icon icon='account-group' />}
                placeholder={field.value ? field.value : placeholder}
                style={styles.textInput} 
            />
            {showDropdown && (
                <SelectDropdown
                    data={options}
                    onSelect={(selectedItem) => {
                        helpers.setValue(selectedItem);
                        setShowDropdown(false);
                    }} 
                    {...props}
                />
            )}
        </View> 
    );

}

export default SelectInput;

{/* <SelectDropdown
                data={options}
                onSelect={(selectedItem) => helpers.setValue(selectedItem)}
                {...props}
            /> */}