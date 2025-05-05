import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, interpolate } from 'react-native-reanimated';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const GlowingWave = ({ image }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const volumeValue = useSharedValue(1);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  const startListening = async () => {
    try {
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        let volume = e.currentMetering && !isNaN(e.currentMetering)
          ? Math.min(10, Math.abs(e.currentMetering)) // Batasi volume agar tidak terlalu besar
          : 1;

        setIsSpeaking(volume > 1);
        volumeValue.value = withTiming(volume, { duration: 200 }); // Animasi smooth
      });
    } catch (error) {
      console.error("Error saat mulai rekaman:", error);
    }
  };

  const stopListening = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    } catch (error) {
      console.error("Error saat menghentikan rekaman:", error);
    }
  };

  const animatedProps = useAnimatedProps(() => ({
    r: interpolate(volumeValue.value, [1, 10], [40, 80]), // Ukuran wave mengikuti volume suara
    opacity: interpolate(volumeValue.value, [1, 10], [0.2, 0.8]), // Transparansi menyesuaikan suara
  }));

  return (
    <View style={styles.container}>
      <Svg width={160} height={160} style={styles.svg}>
        <AnimatedCircle cx="80" cy="80" fill="rgba(0, 122, 255, 0.3)" animatedProps={animatedProps} />
      </Svg>
      <Image source={image} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  svg: {
    position: 'absolute',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default GlowingWave;
