import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, StatusBar, Image, Animated } from "react-native";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// COMPONENTS
import { Button } from "../../components";
import { IconCaretRightWhite, LogoBaitullah } from "../../assets";

// LOTTIE
import LottieSplashScreen from "../../assets/lottie/splashscreen.json";

// ASSETS IMAGES
import { IlustrationSplashScreen01, IlustrationSplashScreen02, IlustrationSplashScreen03 } from '../../assets';
import { getItem, setItem } from "../../utils/localStorage.js";

const screens = [
  {
    title: "My Baitullah",
    text: "My Baitullah adalah platform digital yang dirancang untuk membantu umat Islam dalam menjalankan ibadah sehari-hari. Di dalamnya terdapat berbagai fitur Islami untuk mendukung kehidupan yang lebih religius dan teratur.",
    image: <IlustrationSplashScreen01 width="100%" height="100%" />,
  },
  {
    title: "Fitur",
    text: "My Baitullah menyediakan fitur seperti jadwal sholat, arah kiblat, Al-Qur'an digital, doa harian, dan berbagai layanan Islami untuk mendukung ibadah sehari-hari.",
    image: <IlustrationSplashScreen02 width="100%" height="100%" />,
  },
  {
    title: "Daftar",
    text: "🌟 Tingkatkan ibadahmu dengan lebih mudah! 📿✨ Daftar sekarang di Aplikasi Muslim dan nikmati fitur lengkap seperti jadwal sholat, adzan, Al-Qur’an digital, arah kiblat, dan banyak lagi! 📲💙 #LebihDekatDenganAllah",
    image: <IlustrationSplashScreen03 width="100%" height="100%" />,
  },
];

const IntroScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [showLottie, setShowLottie] = useState(false);
  const flatListRef = useRef(null);

  // Animated values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;
  const logoScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showLottie) {
      Animated.timing(logoScale, { toValue: 100, duration: 3000, useNativeDriver: true }).start();
      Animated.timing(logoOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
      Animated.timing(logoTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

      setTimeout(() => {
        setShowLottie(false);
        navigation.navigate("MainApp", {screen: "Home"});
      }, 2000);
    }
  }, [showLottie]);

  const handleNext = () => {
    if (index < screens.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      setShowLottie(true);
    }
  };

  const handleSkip = () => {
    if (index === screens.length - 1) {
      navigation.navigate("SignIn");
    } else {
      flatListRef.current.scrollToIndex({ index: screens.length - 1, animated: true });
      setIndex(screens.length - 1);
    } 
  };

  const lanjut = async (type) => {
    if(type === "next"){
      if (index < screens.length - 1) {
        flatListRef.current.scrollToIndex({ index: index + 1, animated: true });
        setIndex(index + 1);
      } else {
        setShowLottie(true);
      }
    }else if(type === "skip"){
      if (index === screens.length - 1) {
        navigation.navigate("SignIn");
      } else {
        flatListRef.current.scrollToIndex({ index: screens.length - 1, animated: true });
        setIndex(screens.length - 1);
      } 
    }

    if(index === screens.length - 1){
      setItem("IntroScreen", true)
    }
  };

  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(47, 208, 114, 0.4)', 'rgba(132, 148, 255, 0.4)']} style={[BaseStyle.relative, BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />
      {/* Lottie Animation Screen */}
      {showLottie && (
        <View colors={['rgba(255, 255, 255, 1)', 'rgba(132, 148, 255, 0.4)']} style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, { zIndex: 100 }]}>
          {/* Animasi Pembungkus Membulat & Membesar */}
          <Animated.View style={{position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "#33C060", transform: [{ scale: logoScale }]}} />

          {/* Logo dengan efek fade-up */}
          <Animated.View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w100, BaseStyle.h100, BaseStyle.BgWhite, BaseStyle.radius26, { opacity: logoOpacity, transform: [{ translateY: logoTranslateY }] }]}>
            <Image source={LogoBaitullah} style={{ width: 80, height: 80, resizeMode: "contain" }} />
          </Animated.View>
        </View>
      )}

      
      <View style={[BaseStyle.justifyBetween, BaseStyle.BgWhite, {height: "90%", borderBottomLeftRadius: 50, borderBottomRightRadius: 50}]}>
        <FlatList
          ref={flatListRef}
          data={screens}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setIndex(newIndex);
          }}        
          renderItem={({ item }) => (
            <View style={[styles.container, BaseStyle.wrap]}>
              <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsLeft, BaseStyle.wFull, ({flex: 0.5})]}>
                {item.image}
              </View>
              <View style={[BaseStyle.justifyContentLeft, BaseStyle.wFull, ({flex: 0.5})]}>
                <View style={[BaseStyle.wFull]}>
                  <Text style={[BaseStyle.textXL, BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textCenter, BaseStyle.mb10]}>{item.title}</Text>
                  <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.lh20]}>{item.text}</Text>
                </View>
              </View>
            </View>
          )}
        />
        {/* Indicator Dots */}
        <View style={[styles.dotContainer, ({paddingBottom: "24%"})]}>
          {screens.map((_, i) => (
            <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
          ))}
        </View>
      </View>
      
      <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.justifyContentRight, ({bottom: 0})]}>
        <View style={[BaseStyle.wrap]}>
          <View style={[BaseStyle.wFull]}>
            <Button text={index === screens.length - 1 ? "MULAI" : "SELANJUTNYA"} color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} paddingVertical={14} onPress={() => lanjut("next")} />
            <View style={[BaseStyle.h10]} />
            <Button text={index === screens.length - 1 ? "BUAT AKUN" : "LEWATI"} color='#208D33' borderColor="#208D33" borderRadius={24} paddingVertical={14} onPress={() => lanjut("skip")} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#208D33",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#208D33",
    width: 24,
    height: 10,
  },
  lottieContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default IntroScreen;
