import { Formik } from 'formik';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import FormikInputValue from '../components/FormikInputValue';
import DatePicker from '../components/DatePicker';
import SelectInput from '../components/SelectInput';
import AppBar from '../components/AppBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  textArea: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  form: {
    flex: 3,
    margin: 12,
    paddingBottom: 20,
  },
  formWrapper: {
    flex: 1,
    paddingBottom: 50, 
  },
});

const initialValues = {
  gender: '',
  dateOfBirth: '',
  height: '',
  weight: '',
};

const genderOptions = ["Masculino", "Femenino", "Otro"];



function CompleteProfile( { navigation }) {

    const onSubmit = (values) => {
        console.log(values);
        navigation.navigate("Home");
    };
    
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/completeProfile.png')}
            style={{ width: 375, height: 350 }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textArea} variant="headlineSmall">
            Vamos a completar tu perfil
          </Text>
          <Text style={styles.textArea} variant="bodyMedium">
            ¡Ayudanos a saber mas sobre ti!
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <View style={styles.form}>
                <SelectInput
                    name="gender"
                    options={genderOptions}
                    placeholder="gender"
                />
                <DatePicker
                    name="dateOfBirth"
                />
                <FormikInputValue
                  placeholder="weight"
                  name="weight"
                  icon="scale-bathroom"
                  keyboardType="numeric"
                />
                <FormikInputValue
                  placeholder="height"
                  name="height"
                  icon="human-male-height"
                  keyboardType="numeric"
                />
                <Button mode="contained" onPress={handleSubmit}>
                  Confirmar
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompleteProfile;
