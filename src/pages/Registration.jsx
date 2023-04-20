import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { registrationValidationSchema } from "../validationSchemas/registration.js";
import FormikInputValue from "../components/FormikInputValue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

const initialValues = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
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

export default function RegistrationPage({setUser}) {
  const navigate = useNavigate();

  const onFooterLinkPress = () => {
    navigate("/");
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(user, { displayName: `\${values.name} \${values.lastname}` })
      console.log("User registered successfully");
      setUser(user);
      navigate( '/', { replace: true });
    } catch (error) {
      console.log("Error registering:", error.message);
    }
  };

  return (
    <Formik validationSchema={registrationValidationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {( { handleSubmit } ) => (
        <View style={styles.form}>
          <FormikInputValue
            placeholder="Name"
            name="name"
          />
          <FormikInputValue
            placeholder="Lastname"
            name="lastname"
          />
          <FormikInputValue
            placeholder="E-mail"
            name="email"
          />
          <FormikInputValue
            placeholder="Password"
            name="password"
            secureTextEntry
          />
          <FormikInputValue
            placeholder="Confirm Password"
            name="confirmPassword"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Register" />
          <Text styles={styles.footerText}>
            Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text>
          </Text>
        </View>
      )}
    </Formik>
  );
}
