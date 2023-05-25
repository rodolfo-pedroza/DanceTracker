import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import VideoPlayer from "./VideoPlayer";

const VideoList = ({categoria}) => {
    const tailwind = useTailwind();
    return (
        <ScrollView style={tailwind('flex-1')}>
            {categoria.exercises.map((videoId) => (
                <VideoPlayer videoId={videoId} />
            ))                                
            }
        </ScrollView>
    );
    }

export default VideoList;