import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useTailwind } from "tailwind-rn";

export default function VideoPlayer({ videoId, onTogglePlayback, videoRef, setStatus }) {
  const tailwind = useTailwind();
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={tailwind('flex justify-center')}>
      { loading && (
        <View style={tailwind('')}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
        <Video
          ref={videoRef}
          style={tailwind('self-center h-64 w-96')}
          source={{
            uri: `https://www.dropbox.com/s/${videoId}.mp4?dl=1`,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
          }}
          onLoad={ () => setLoading(false) }
        />
    </View>
  );
}

