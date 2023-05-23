import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Card, IconButton, Switch } from 'react-native-paper'
import { useTailwind } from 'tailwind-rn';

const NotificationSwitch = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <Switch 
            value={isSwitchOn} 
            onValueChange={onToggleSwitch}
            color="#818cf8"
        />
    )
}

const NotificationCard = () => {
    const tailwind = useTailwind();
    return (
        <View style={tailwind("mt-4 mx-8 ")}>
        <Card style={tailwind("p-4 rounded-3xl bg-white")}>
          <Text style={tailwind("text-xl font-bold px-4")}>Notificaciones</Text>
          <View style={tailwind("flex-row justify-between items-center")}>
            <View style={tailwind("flex-row items-center")}>
              <IconButton icon="bell-outline" size={24} iconColor="#818cf8" />
              <Text style={tailwind("text-sm")}>Avisos de Notificación</Text>
            </View>
            <NotificationSwitch />
          </View>
        </Card>
      </View>
    )
}

export default NotificationCard