import React from 'react';
import AutenticatedRoutes from './AutenticatedRoutes'
import UnautenticatedRoutes from "./UnauthenticatedRoutes";
import { useAuth } from '../contexts/authContext';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/ProfilePage';
import UserDataPage from '../pages/UserDataPage';

const Stack = createStackNavigator();

function CombinedNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AutenticatedRoutes" component={AutenticatedRoutes} options={{headerShown: false}} />
            <Stack.Screen 
                name="ProfilePage"
                component={Profile}
                options={{
                    title: 'Perfil',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }}
            />
            <Stack.Screen
                name='UserDataPage'
                component={UserDataPage}
                options={{
                    title: 'Datos Personales',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }}
            />
        </Stack.Navigator>
    );
}

export default function Routes() {
    const { user } = useAuth();
    return user ? <CombinedNavigator  /> : <UnautenticatedRoutes />;
}