import React from "react";
import { ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, StyleSheet, View, Platform, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import FormikInputValue from "../components/FormikInputValue";
import { registrationValidationSchema } from "../validationSchemas/registration.js";
import { Text, Button, IconButton } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js";
import { useTailwind } from "tailwind-rn";

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
    flex: 2,
    margin: 12,
  },
  middle: {
    flex: 3,
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
  const tailwind = useTailwind();

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
                    Crea una cuenta{" "}
                  </Text>
                  <FormikInputValue placeholder="Nombre" name="name" icon="account" />
                  <FormikInputValue
                    placeholder="Apellido"
                    name="lastname"
                    icon="account"
                  />
                  <FormikInputValue
                    placeholder="Correo electrónico"
                    name="email"
                    icon="email"
                  />
                  <FormikInputValue
                    placeholder="Contraseña"
                    name="password"
                    secureTextEntry
                    icon="lock"
                    iconRight="eye"
                  />
                  <FormikInputValue
                    secureTextEntry
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    icon="lock"
                  />
                  <View style={styles.middle}>
                    <Button onPress={handleSubmit} mode="contained">
                      <Text style={tailwind("text-white text-lg font-bold")}>
                        Registrarse
                      </Text>
                    </Button>
                  </View>
                </View>
              </>
            )}
          </Formik>
          <View style={styles.end}>
            <Text variant="labelLarge" style={{ textAlign: "center" }}>
              {" "}
              O continua con{" "}
            </Text>
            <View style={tailwind("flex py-2")}>
              <TouchableOpacity
                style={tailwind(
                  "flex flex-row justify-center items-center p-1 mx-6 my-2 border-solid border-2 rounded-lg "
                )}
                onPress={loginWithGoogle}
              >
                <Image
                  style={tailwind("w-10 h-10")}
                  source={require("../assets/images/google.png")}
                />
                <Text style={tailwind("text-lg font-bold")}>
                  Continuar con Google
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={tailwind('text-center py-2')}>
              ¿Ya tienes una cuenta?{" "}
              <Text style={tailwind('text-lg font-bold text-indigo-400')} onPress={onFooterLinkPress}>
                Inicia sesión
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
