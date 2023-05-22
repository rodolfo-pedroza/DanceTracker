import { ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import FormikInputValue from "../components/FormikInputValue";
import { registrationValidationSchema } from "../validationSchemas/registration.js";
import { Text, Button, IconButton } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js";

const initialValues = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

export default function RegistrationPage({ navigation }) {
  const { user, register, loginWithGoogle } = useAuth();

  const onFooterLinkPress = () => {
    navigation.navigate("LoginPage");
  };

  const onSubmit = async (values) => {
    console.log(user);
    try {
      await register(
        values.name,
        values.lastname,
        values.email,
        values.password
      );
      console.log("User registered successfully");
    } catch (error) {
      console.log("Error registering:", error.message);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container} >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={registrationValidationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <>
                <View style={styles.form}>
                  <Text variant="headlineSmall" style={{ textAlign: "center" }}>
                    {" "}
                    Create an account{" "}
                  </Text>
                  <FormikInputValue placeholder="Name" name="name" icon="account" />
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
                  <View style={styles.middle}>
                    <Button onPress={handleSubmit} mode="contained">
                      Register
                    </Button>
                  </View>
                </View>
              </>
            )}
          </Formik>
          <View style={styles.end}>
            <Text variant="labelLarge" style={{ textAlign: "center" }}>
              {" "}
              Or login with{" "}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <IconButton icon="google" size={30} onPress={loginWithGoogle} />
            </View>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.footerLink} onPress={onFooterLinkPress}>
                LogIn
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
