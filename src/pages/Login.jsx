import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from '../validationSchemas/login.js'    
import FormikInputValue from "../components/FormikInputValue";
import { Text, Button } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js"


const initialValues = {
    email: '',
    password: '',
};

const styles = StyleSheet.create({
    form: {
        margin: 12,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginTop: -5,  
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d',
        textAlign: 'center',
    },
    footerLink: {
        color: '#788eec',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default function LoginPage({navigation}) {
    
    const { login } = useAuth();
    
    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationPage');
    };
    
    const onSubmit = async (values) => {
        try{
            await login(values.email, values.password);
            console.log('User logged in successfully');
        } catch (error) {
            console.log('Error logging in:', error);
        }
    };
    
    return (
       <Formik validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={onSubmit}>
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
                <Button onPress={handleSubmit} mode="contained" > Sign in </Button>
                <Text style={styles.footerText}  >
                    Don't have an account? <Text style={styles.footerLink} onPress={onFooterLinkPress} >Sign Up</Text>
                </Text>
            </View>
            )
        }
       </Formik>       
    );
}