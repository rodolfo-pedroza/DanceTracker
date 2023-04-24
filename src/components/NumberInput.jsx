import React from 'react';
import { TextInput } from 'react-native-paper';

const NumberInput = ({ name, label, maxLength }) => (
  <TextInput
    keyboardType="numeric"
    maxLength={maxLength}
    label={label}
    onChangeText={(text) => {
      // Handle text change
    }}
  />
);

export default NumberInput;
