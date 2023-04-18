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
    },
    scroll: {
        paddingBottom: 15,
    },
    text: {
        color: theme.colors.black,
        paddingHorizontal: 10,
    },
    active: {
        color: theme.colors.gray1,
    },
});

const AppBarTab = ({ children, to}) => {

    const { pathname } = useLocation();
    const active = pathname  === to;

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
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scroll}>
                <AppBarTab to='/'>DanceTracker</AppBarTab>
                <AppBarTab to='/login'>Sign In</AppBarTab>
            </ScrollView>
        </View>
    );
};

export default AppBar;
