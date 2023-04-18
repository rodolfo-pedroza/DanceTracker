import { StyleSheet, TextInput } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.gray1,
        padding: 10,
        margin: 10,
    },
    error: {
        borderColor: theme.colors.danger,
    },
});

const StyledTextInput = ({ style = {}, error, ...props }) => {

    const inputSyle= [
        styles.textInput,
        style,
        error && styles.error,
    ]

    return <TextInput style={inputSyle} {...props} />;
    
    }

export default StyledTextInput;
