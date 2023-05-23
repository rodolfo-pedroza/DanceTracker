import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import StyledText from './StyledText';
import theme from "../theme";
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';

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

const AppBarTab = ({ children, to }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const active = route.name === to;

    const textStyles = [
        styles.text,
        active && styles.active,
    ];

    return (
        <TouchableOpacity onPress={() => navigation.navigate(to)}>
            <StyledText style={textStyles}>{children}</StyledText>
        </TouchableOpacity>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scroll}>
                <AppBarTab to='Home'>DanceTracker</AppBarTab>
                <AppBarTab to='/gallery'>Gallery</AppBarTab>
                <AppBarTab to='CompleteProfile'>Complete</AppBarTab>
            </ScrollView>
        </View>
    );
};

export default AppBar;
