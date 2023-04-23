import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { registrationValidationSchema } from "../validationSchemas/registration.js";
import FormikInputValue from "../components/FormikInputValue";
import { Text, Button } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js";

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
        textAlign: 'center',
    },
    footerLink: {
        color: '#788eec',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default function RegistrationPage({navigation}) {

  const { user, register } = useAuth();
  
  const onFooterLinkPress = () => {
    navigation.navigate('LoginPage');
  };

  const onSubmit = async (values) => {
    console.log(user);
    try {
      await register(values.name, values.lastname, values.email, values.password);
      console.log("User registered successfully");
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
            icon="account"
          />
          <FormikInputValue
            placeholder="Lastname"
            name="lastname"
            icon="account"
          />
          <FormikInputValue
            placeholder="E-mail"
            name="email"
            icon="email"
          />
          <FormikInputValue
            placeholder="Password"
            name="password"
            secureTextEntry
            icon="lock"   
            iconRight="eye"     
          />
          <FormikInputValue
            secureTextEntry
            placeholder="Confirm Password"
            name="confirmPassword"
            icon="lock"
          />
          <Button onPress={handleSubmit} mode="contained" >Register</Button>
          <Text style={styles.footerText}  >
            Already have an account? <Text style={styles.footerLink} onPress={onFooterLinkPress} >Sign Up</Text>
          </Text>
        </View>
      )}
    </Formik>
  );
}
