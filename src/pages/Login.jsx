import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "../validationSchemas/login.js";
import FormikInputValue from "../components/FormikInputValue";
import { Text, Button } from "react-native-paper";
import { useAuth } from "../contexts/authContext.js";
import { useTailwind } from "tailwind-rn";

const initialValues = {
  email: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  form: {
    flex: 2,
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
});

export default function LoginPage({ navigation }) {
  const { login, loginWithGoogle, loading } = useAuth();
  const tailwind = useTailwind();

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <>
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
                  <Text variant="labelLarge" style={{ textAlign: "center" }}>
                    {" "}
                    Olvidaste tu contraseña?{" "}
                  </Text>
                  <View style={styles.middle}>
                    <Button onPress={handleSubmit} mode="contained">
                      <Text style={tailwind("text-white text-lg font-bold")}>
                        Iniciar Sesión
                      </Text>
                    </Button>
                  </View>
                </View>
              </>
            )}
          </Formik>
          <View style={styles.end}>
            <Text variant="labelLarge" style={{ textAlign: "center" }}>
              <Text style={tailwind("text-base font-bold")}>
                También puedes usar tus redes sociales.
              </Text>
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
              ¿No tienes cuenta?{" "}
              <Text style={tailwind('text-lg font-bold text-indigo-400')} onPress={onFooterLinkPress}>
                Regístrate
              </Text>
            </Text>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
