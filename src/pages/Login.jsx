import { View, Button, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from '../validationSchemas/login.js'    
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-native";
import FormikInputValue from "../components/FormikInputValue";

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
    },
    footerLink: {
        color: '#788eec',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default function LoginPage({setUser}) {
    
    const onSubmit = async (values) => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log('User logged in successfully');
            setUser(userCredential.user);
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
                <Button onPress={handleSubmit} title="Sign In" />
                <Text styles={styles.footerText}>
                    Don't have an account? 
                    <Link to="/registration" >
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </Link>
                </Text>
            </View>
            )
        }
       </Formik>       
    );
}