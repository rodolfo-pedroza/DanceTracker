import { StyleSheet} from 'react-native';
import theme from '../theme';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
    },
});

const StyledTextInput = ({ style = {}, error, ...props }) => {

    const inputSyle= [
        styles.textInput,
        style,
    ]

    return <TextInput mode='outlined' error={error} style={inputSyle} {...props} />;
    
    }

export default StyledTextInput;
