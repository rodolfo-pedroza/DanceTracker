import { View, StyleSheet, ScrollView } from 'react-native';
import StyledText from './StyledText';
import theme from "../theme";
import { Link, useLocation } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.effects.blueShadow,
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight + 10,
        paddingLeft: 10,
    },
    text: {
        color: theme.colors.black,
        paddingHorizontal: 10,
    },
    active: {
        color: theme.colors.white,
    },
});

const AppBarTab = ({ children, to}) => {

    const {pathnames} = useLocation();
    const active = pathnames === to;

    const textStyles = [
        styles.text,
        active && styles.active,
    ];

    return (
        <Link to={to}>
            <StyledText style={textStyles}>{children}</StyledText>
        </Link>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <AppBarTab to='/'>DanceTracker</AppBarTab>
                <AppBarTab to='/login'>Sign In</AppBarTab>
            </ScrollView>
        </View>
    );
};

export default AppBar;
