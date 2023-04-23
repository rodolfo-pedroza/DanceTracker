import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
    text: {
        color: theme.colors.black,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorPrimary: {
        color: theme.colors.blueShadow,
    },
    colorSecondary: {
        color: theme.colors.purpleShadow,
    },
    bold: {
        fontWeight: theme.fontWeights.bold,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    textAlign: {
        textAlign: "center",
    },
});

export default function StyledText({ children, color, fontSize, fontWeight, align, style, ...restOfProps }) {
    const textStyles = [
        styles.text,
        color === "primary" && styles.colorPrimary,
        color === "secondary" && styles.colorSecondary,
        fontSize === "subheading" && styles.fontSizeSubheading,
        fontWeight === "bold" && styles.bold,
        align === "center" && styles.textAlign,
        style,
    ];

    return (
        <Text 
            style={textStyles}
            {...restOfProps}
        >
            {children}
        </Text>
    );  
}
