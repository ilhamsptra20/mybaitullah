import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Animated, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// IMAGE
import { IlustrationQiblaCompass, IconArrowLeftWhite } from '../../assets';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

const height = Dimensions.get("window");

const QiblaScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState("Menentukan lokasi...");
  const rotateValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    requestLocationPermission();
    const degreeUpdateRate = 0.5;
    CompassHeading.start(degreeUpdateRate, ({ heading }) => {
      setHeading(prevHeading => {
        if (Math.abs(prevHeading - heading) > 0.5) {
          animateRotation(qiblaDirection !== null ? heading - qiblaDirection : heading);
          return heading;
        }
        return prevHeading;
      });
    });
    return () => CompassHeading.stop();
  }, [qiblaDirection]);

  const animateRotation = (newHeading) => {
    Animated.timing(rotateValue, {
      toValue: newHeading,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      }
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.GRANTED) {
        getUserLocation();
      }
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        calculateQiblaDirection(latitude, longitude);
        fetchCityName(latitude, longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      if (data.address && data.address.city) {
        setCity(data.address.city);
      } else if (data.address && data.address.town) {
        setCity(data.address.town);
      } else if (data.address && data.address.village) {
        setCity(data.address.village);
      } else {
        setCity("Lokasi tidak ditemukan");
      }
    } catch (error) {
      console.log("Error fetching city name: ", error);
      setCity("Gagal mendapatkan lokasi");
    }
  };

  const calculateQiblaDirection = (userLat, userLng) => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    const deltaLng = kaabaLng - userLng;
    const y = Math.sin(deltaLng * (Math.PI / 180)) * Math.cos(kaabaLat * (Math.PI / 180));
    const x = Math.cos(userLat * (Math.PI / 180)) * Math.sin(kaabaLat * (Math.PI / 180)) -
              Math.sin(userLat * (Math.PI / 180)) * Math.cos(kaabaLat * (Math.PI / 180)) *
              Math.cos(deltaLng * (Math.PI / 180));
    let qiblaAngle = Math.atan2(y, x) * (180 / Math.PI);
    qiblaAngle = (qiblaAngle + 360) % 360;
    setQiblaDirection(qiblaAngle);
  };

  const getQiblaStatus = () => {
    if (qiblaDirection === null) return "Menunggu lokasi...";
    const difference = Math.abs(heading - qiblaDirection);
    if (difference > 15) return "Letakan perangkat Anda di permukaan yang rata lalu gerakkan perangkat Anda hingga jarum kompas mengarah ke arah kiblat";
    if (difference > 3) return "Sedikit lagi...";
    return "Sekarang Anda menghadap ke arah Mekkah.";
  };

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />
      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute, 
          BaseStyle.index1, 
          BaseStyle.wFull, navShadow === true ? 
          BaseStyle.navScroll : undefined,
          ({
            paddingTop: StatusBar.currentHeight + 10, 
            paddingHorizontal: 14, 
            paddingBottom: 10, 
            backgroundColor: '#2CA44B', 
            borderBottomLeftRadius: 6, 
            borderBottomRightRadius: 6
            })
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderHeight(height);
          }}
        >
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          {qiblaDirection !== null && <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Kiblat: {qiblaDirection.toFixed(2)}°</Text>}
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      <View style={[BaseStyle.wrap, ({flex:1, paddingTop: headerHeight})]}>
        <View style={[BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, ({flex: 1, paddingTop: "20%"})]}>
          <View style={{flex: 0.2}}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.textCenter]}>Lokasi: {city}</Text>
          </View>
          <View style={[BaseStyle.alignItemsCenter, ({flex: 0.8})]}>
            <Animated.Image source={IlustrationQiblaCompass} style={[BaseStyle.hAuto, BaseStyle.rectangle, ({width: "100%", transform: [{ rotate: rotateInterpolation }]})]} />
            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.textCenter, BaseStyle.lh20]}>{getQiblaStatus()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default QiblaScreen;
