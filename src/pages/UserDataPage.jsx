import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import GoalsCard from "../components/GoalsCard";
import { Card, IconButton, TextInput } from "react-native-paper";

const onIconPress = () => {
    // activate text to recieve input
}

const ProfilePage = () => {
    const tailwind = useTailwind();
    return (
        <ScrollView>
            <GoalsCard icon='cog-outline' onIconPress={onIconPress}/>
            <View style={tailwind("mx-8")}>
                <View style={tailwind('flex-row justify-between items-center py-3')} >
                    <View style={tailwind('w-72')}>
                        <TextInput
                            placeholder='Tu peso'
                            keyboardType='numeric'
                            mode="flat"
                            left={<TextInput.Icon icon='scale-bathroom' />}
                            style={tailwind('bg-gray-200 rounded-2xl')}
                        />
                    </View>
                    <View style={tailwind('bg-blue-300  p-3.5 rounded-2xl')}>
                        <Text style={tailwind('text-sm text-white')}>KG</Text>
                    </View>
                </View>
                <View style={tailwind('flex-row justify-between items-center py-3')} >
                    <View style={tailwind('w-72')}>
                        <TextInput
                            placeholder='Tu estatura'
                            keyboardType='numeric'
                            mode="flat"
                            left={<TextInput.Icon icon='human-male-height' />}
                            style={tailwind('bg-gray-200 rounded-2xl')}
                        />
                    </View>
                    <View style={tailwind('bg-blue-300  p-3.5 rounded-2xl')}>
                        <Text style={tailwind('text-sm text-white')}>CM</Text>
                    </View>
                </View>
                <View style={tailwind('flex-row justify-between items-center py-3')} >
                    <View style={tailwind('w-72')}>
                        <TextInput
                            placeholder='Peso a alcanzar'
                            keyboardType='numeric'
                            mode="flat"
                            left={<TextInput.Icon icon='scale-bathroom' />}
                            style={tailwind('bg-gray-200 rounded-2xl')}
                        />
                    </View>
                    <View style={tailwind('bg-blue-300  p-3.5 rounded-2xl')}>
                        <Text style={tailwind('text-sm text-white')}>KG</Text>
                    </View>
                </View>
            </View>
            <Card style={tailwind("mt-4 mx-8 p-4 rounded-3xl bg-indigo-100")}>
                <View style={tailwind("flex-row items-center")}>
                    <View style={tailwind("")}>
                        <Text style={tailwind("text-base font-bold px-4")}>Horas ideales de sueño</Text>
                        <Text style={tailwind("text-lg text-indigo-400 px-4")}>8 horas 30 minutos</Text>
                        <TouchableOpacity style={tailwind("rounded-3xl p-2.5 m-4 w-32 bg-indigo-300")}>
                            <Text style={tailwind("text-sm text-white text-center")}>Aprende más</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tailwind("")}>
                        <Image source={require('../assets/images/sleepyMoon.png')} style={tailwind("")} />
                    </View>
                </View>
            </Card>
            <TouchableOpacity style={tailwind("rounded-full p-5 mx-8 mt-12 bg-indigo-300")}>
                <Text style={tailwind("text-lg text-white text-center font-bold")}>Fijar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ProfilePage