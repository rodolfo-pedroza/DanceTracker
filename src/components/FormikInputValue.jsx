import { useField } from "formik";
import StyledTextInput from "./StyledTextInput";
import StyledText from "./StyledText";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginTop: -5,  
    },
});


const FormikInputValue = ( { name, ...props } ) => {
    const [field, meta, helpers] = useField(name);

    return (
        <>
            <StyledTextInput
                error={meta.error}
                value={field.value}
                onChangeText={value => helpers.setValue(value)}
                {...props}
            />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    );
}

export default FormikInputValue;
