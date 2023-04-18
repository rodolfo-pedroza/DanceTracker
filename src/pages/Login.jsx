import { View, Button, StyleSheet } from "react-native";
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput";

const initialValues = {
    email: '',
    password: '',
};

const styles = StyleSheet.create({
    form: {
        margin: 12,
    },
});

const FormikInputValue = ( { name, ...props } ) => {
    const [field, meta, helpers] = useField(name);

    return (
        <StyledTextInput
            value={field.value}
            onChangeText={value => helpers.setValue(value)}
            {...props}
        />
    );
}

export default function LoginPage() {
    return (
       <Formik initialValues={initialValues} onSubmit=
       { values => console.log(values)}>
        {( { handleSubmit } ) => (
            <View style={styles.form}>
                <FormikInputValue 
                    placeholder="E-mail"
                    name='email'
                />
                <FormikInputValue 
                    placeholder="Password"
                    name='password'
                    secureTextEntry
                />
                <Button onPress={handleSubmit} title="Sign In" />
            </View>
            )
        }
       </Formik>
    );
}