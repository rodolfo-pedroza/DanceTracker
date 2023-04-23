import { StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
    },
});

const StyledTextInput = ({ style = {}, error, icon, iconRight, secureTextEntry, ...props }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const inputSyle= [
        styles.textInput,
        style,
    ]

    return <TextInput 
            mode='outlined' 
            left={<TextInput.Icon icon={icon} />}
            right={ iconRight ? (
                <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                />
            ) : null}
            error={error} 
            style={inputSyle} 
            secureTextEntry={!isPasswordVisible && secureTextEntry}

            {...props} />;

    }

export default StyledTextInput;
