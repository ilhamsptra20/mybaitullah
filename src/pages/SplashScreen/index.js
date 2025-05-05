import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

// REANIMATED COMPONENTS
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// ASSETS IMAGES
import { IlustrationSplashScreen } from '../../assets';
import { getItem } from '../../utils/localStorage.js';

const SplashScreen = ({ navigation }) => {
  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(0);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const checkIntroScreen = async () => {
      try {
        const introSeen = await getItem("IntroScreen");
        console.log("IntroScreen status:", introSeen);

        // navigation.replace("MainApp", { screen: "Home" })
        if (introSeen || status !== 0) {
          navigation.replace("MainApp", { screen: "Home" }); // Langsung ke Home jika IntroScreen sudah dilihat atau status bukan 0
        } else {
          navigation.replace("IntroScreen"); // Jika belum, tampilkan IntroScreen
        }
      } catch (error) {
        console.error("Error loading IntroScreen status:", error);
        navigation.replace("IntroScreen");
      }
    };

    // Navigasi setelah 3 detik
    timeoutRef.current = setTimeout(() => {
      checkIntroScreen();
    }, 3000);

    // Cleanup timeout untuk mencegah memory leaks
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigation, status]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });


  return (
    <View style={[BaseStyle.container, ({ flex: 1 })]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />
      <View style={{ flex: 1 }}>
        <ImageBackground source={IlustrationSplashScreen} resizeMode="cover" style={[BaseStyle.justifyCenter, BaseStyle.alignCenter, { ...StyleSheet.absoluteFillObject }]}>
          {/* <Animated.View style={[BaseStyle.justifyCenter, animatedStyle]}>
            <Text style={[BaseStyle.textXL3, BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textCenter]}>Baitullah</Text>
            <Text style={[BaseStyle.textXL3, BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textCenter]}>Teman ibadahmu setiap hari.</Text>
          </Animated.View> */}
        </ImageBackground>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})