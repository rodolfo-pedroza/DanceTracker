import { useNavigation } from '@react-navigation/native';
import React from 'react';  
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    height: 300,
  },
});

const ThumbnailList = ({categoria}) => {
    const tailwind = useTailwind();
    const navigation = useNavigation();
    return (
        <>
            {categoria.exercises.map((thumbnail, index) => (
                <TouchableOpacity 
                    style={tailwind('flex mt-4 mx-8 rounded-3xl bg-slate-700')}
                    key={thumbnail.videoId}
                    onPress={() => navigation.navigate('RoutinePage', { thumbnail, index })}
                >
                    <ImageBackground
                        source={{ uri: thumbnail.thumbnail }} 
                        style={styles.card}
                    >
                        <View style={tailwind('flex justify-center p-4 absolute bottom-0 left-0')}>
                            <Text style={tailwind('text-white text-xl font-bold')}>{thumbnail.rithm}</Text>
                            <Text style={tailwind('text-white text-sm')}>Clase {index + 1}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            ))                                
            }
        </>
    );
    }

export default ThumbnailList;