import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useField } from "formik";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    textInput: {
        margin: 10,
    },
});

const DatePicker = ({ name, ...props   }) => {

    const [field, meta, helpers] = useField(name);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const toggleDatePicker = () => {
        setShow(!show);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        helpers.setValue(currentDate);
    };

    return (
        <View>
            <TextInput 
                value={date.toLocaleDateString()}
                mode="outlined"
                editable={false}
                right={<TextInput.Icon 
                        icon="calendar"
                        onPress={toggleDatePicker} 
                    />}
                left={<TextInput.Icon icon="calendar" />}
                style={styles.textInput} 

            />
            {show && (
                <DateTimePicker
                    value={field.value || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );


}

export default DatePicker;