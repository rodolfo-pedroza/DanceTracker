import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { useTailwind } from 'tailwind-rn';
import { Card } from 'react-native-paper';

const UserInfoCard = () => {
    const tailwind = useTailwind();

    const user = {
        height: 180,
        weight: 80,
        age: 25,
    }
    
    return (
        <View style={tailwind('flex-row mt-4 mx-8 justify-between')} >
            <Card style={tailwind('p-4 rounded-3xl bg-white')}> 
                <View style={tailwind('w-16')}>
                    <Text style={tailwind('text-base font-bold text-indigo-400 text-center')}>{user.height} cm</Text>
                    <Text style={tailwind('text-sm text-center')}>Altura</Text>
                </View>
            </Card>
            <Card style={tailwind('p-4 rounded-3xl bg-white')}>
                <View style={tailwind('w-16')}>
                    <Text style={tailwind('text-base font-bold text-indigo-400 text-center')}>{user.weight} kg</Text>
                    <Text style={tailwind('text-sm text-center')}>Peso</Text>
                </View>
            </Card>
            <Card style={tailwind('p-4 rounded-3xl bg-white')}>  
                <View style={tailwind('w-16')}>
                    <Text style={tailwind('text-base font-bold text-indigo-400 text-center')}>{user.age} años</Text>
                    <Text style={tailwind('text-sm text-center')}>Edad</Text>
                </View>
            </Card>
        </View>
    )
}

export default UserInfoCard