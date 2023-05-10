import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "../validationSchemas/login.js";
import FormikInputValue from "../components/FormikInputValue";
import { Text, Button, IconButton } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js";
import { KeyboardAvoidingView } from "react-native";

const initialValues = {
  email: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  form: {
    flex: 3,
    margin: 12,
  },
  middle: {
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  end: {
    flex: 1,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -5,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
    textAlign: "center",
    paddingTop: 20,
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function LoginPage({ navigation }) {
  const { login, loginWithGoogle } = useAuth();

  const onFooterLinkPress = () => {
    navigation.navigate("RegistrationPage");
  };

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      console.log("User logged in successfully");
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <View style={styles.form}>
              <Text variant="headlineSmall" style={{ textAlign: "center" }}>
                {" "}
                Iniciar Sesión{" "}
              </Text>
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
              <Text variant="labelLarge" style={{ textAlign: "center" }}>
                {" "}
                Forgot password?{" "}
              </Text>
              <View style={styles.middle}>
                <Button onPress={handleSubmit} mode="contained">
                  {" "}
                  Sign in{" "}
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.end}>
        <Text variant="labelLarge" style={{ textAlign: "center" }}>
          {" "}
          Or sign in with{" "}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <IconButton icon="facebook" size={30} onPress={loginWithGoogle} />
          <IconButton icon="google" size={30} />
        </View>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.footerLink} onPress={onFooterLinkPress}>
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
