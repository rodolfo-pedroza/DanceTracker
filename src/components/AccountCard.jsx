import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Card, IconButton } from 'react-native-paper'
import { useTailwind } from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

const AccountCard = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation();

    const onDataPress = () => {
        navigation.navigate('UserDataPage')
    }
    
    return (
        <View>
            <Card style={tailwind('flex mt-4 mx-8 bg-white')}>
                <View style={tailwind('m-4')}>
                    <Text style={tailwind('text-xl font-bold px-4')}>Cuenta</Text>
                    <View style={tailwind('flex-row justify-between items-center')}>
                        <View style={tailwind('flex-row items-center')}>
                        <IconButton icon="account-outline" size={24} iconColor='#818cf8'/>
                        <Text style={tailwind('text-sm')}>Datos Personales</Text>
                    </View>
                        <IconButton icon="chevron-right" size={24} iconColor='#818cf8' onPress={onDataPress}/>
                    </View>
                    <View style={tailwind('flex-row justify-between items-center')}>
                        <View style={tailwind('flex-row items-center')}>
                        <IconButton icon="text-box-outline" size={24} iconColor='#818cf8' />
                        <Text style={tailwind('text-sm')}>Logros</Text>
                    </View>
                        <IconButton icon="chevron-right" size={24} iconColor='#818cf8' />
                    </View>
                    <View style={tailwind('flex-row justify-between items-center')}>
                        <View style={tailwind('flex-row items-center')}>
                        <IconButton icon="chart-pie" size={24} iconColor='#818cf8' />
                        <Text style={tailwind('text-sm')}>Historial de Actividad</Text>
                    </View>
                        <IconButton icon="chevron-right" size={24} iconColor='#818cf8' />
                    </View>
                    <View style={tailwind('flex-row justify-between items-center')}>
                        <View style={tailwind('flex-row items-center')}>
                        <IconButton icon="chart-waterfall" size={24} iconColor='#818cf8' />
                        <Text style={tailwind('text-sm')}>Progreso</Text>
                    </View>
                        <IconButton icon="chevron-right" size={24} iconColor='#818cf8' />
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default AccountCard