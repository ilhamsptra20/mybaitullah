import { StyleSheet, Text, View, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

// COMPONENTS
import { TextInput, TextInputPassword, Button, CheckBox } from '../../components/index.js';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconArrowLeftWhite, IconArrowLeftBlack, IconGoogle, IconApple, IconSuccessGreen } from '../../assets'

// API
import userData from '../../hook/user/userFetch.js'
import useLogin from '../../hook/useLogin.js';
import useAuth from '../../hook/useAuth.js';

const SignIn = ({ navigation }) => {
  // USER DATA
  // const { user, loadingUser, errorUser } = userData();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  // MODAL SUCCESS CREAT CHANNEL
  const [modalLoad, setModalLoad] = useState(false);

  // Check Text Input is Empty
  const [email, setEmail] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('#D9D9D9');
  const [emailWarning, setEmailWarning] = useState('');

  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#D9D9D9');
  const [passwordWarning, setPasswordWarning] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  // hook login
  const { login, loading, error } = useLogin();
  const { user, logout } = useAuth();

  const checkTextInput = async () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk validasi email

    // Cek apakah email kosong
    if (!email.trim()) {
      setEmailWarning('Masukan alamat email Anda!');
      setEmailBorderColor('#FF4D4D');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailWarning('Format email tidak valid!');
      setEmailBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setEmailWarning('');
      setEmailBorderColor('#D9D9D9');
    }

    // Cek apakah password kosong
    if (!password.trim()) {
      setPasswordWarning('Masukan kata sandi Anda!');
      setPasswordBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPasswordWarning('');
      setPasswordBorderColor('#D9D9D9');
    }

    if (isValid) {
      setModalLoad(true);
      const result = await login({ email, password });
      console.log('result ', result);

      if (!result.success) {
        setEmailWarning('Email dan password tidak cocok!');
        setEmailBorderColor('#FF4D4D');
        setPasswordBorderColor('#FF4D4D');
        setModalLoad(false);
      } else {
        navigation.replace('MainApp', { screen: 'Home' });
      }
    }

  };

  return (
    <View style={[BaseStyle.container]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ flex: 1 }} >
        <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

        {/* HEADER */}
        <View style={[BaseStyle.absolute, BaseStyle.wFull, navShadow >= 1 ? BaseStyle.navScroll : undefined, navShadow >= 1 ? BaseStyle.BgWhite : undefined, ({ paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, zIndex: 3 })]}>
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[BaseStyle.w20, BaseStyle.w20]}
              onPress={() => {
                navigation.replace('MainApp'); // atau screen default kamu
              }}>
              {navShadow >= 1 ? <IconArrowLeftBlack /> : <IconArrowLeftWhite />}
            </TouchableOpacity>
            <Text style={[BaseStyle.MaisonBold, navShadow >= 1 ? BaseStyle.textBlack : BaseStyle.textWhite, BaseStyle.textMD]}>My Baitullah</Text>
            <View style={[BaseStyle.w20, BaseStyle.w20]} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: false,
              listener: (event) => {
                let offset = event.nativeEvent.contentOffset.y;
                setNavShadow(offset >= 1);
              },
            }
          )}
          scrollEventThrottle={16}
        >
          {/* HEADER */}
          <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape, BaseStyle.BgOverlay, ({ top: 0, zIndex: 2 })]} />
          <Animated.Image
            source={IlustrationPattern6}
            style={[
              BaseStyle.wFull,
              BaseStyle.hAuto,
              BaseStyle.landscape,
              BaseStyle.objectFit,
              BaseStyle.shadow,
              {
                transform: [{
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0, 200], // Scroll position range
                    outputRange: [1.2, 1, 1.2], // Zoom in / out effect
                    extrapolate: 'clamp' // Prevents zooming out further when scrolling down
                  })
                }]
              }
            ]}
          />
          <View style={[BaseStyle.relative, BaseStyle.BgWhite, ({ paddingTop: 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: -30, zIndex: 1, minHeight: height * 0.76, flexGrow: 1, zIndex: 3 })]}>
            <View style={[BaseStyle.wrap, ({ flex: 1 })]}>
              <View style={{ flex: 0.9 }}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textXL1, BaseStyle.textCenter]}>Masuk</Text>
                <View style={[BaseStyle.pt40]}>
                  <TextInput lable="Alamat Email" keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="Masukan alamat email" borderColor={emailBorderColor} onChangeText={(value) => { setEmail(value); setEmailWarning(''); setEmailBorderColor('#D9D9D9'); }} />
                  {emailWarning !== '' && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{emailWarning}</Text>)}
                  <View style={[BaseStyle.h10]} />
                  <TextInputPassword lable="Kata Sandi" placeholder="Masukan kata sandi Anda" borderColor={passwordBorderColor} onChangeText={(value) => { setPassword(value); setPasswordWarning(''); setPasswordBorderColor('#D9D9D9'); }} />
                  {passwordWarning !== '' && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{passwordWarning}</Text>)}
                  <View style={[BaseStyle.h10]} />
                  <View style={[BaseStyle.row, BaseStyle.justifyBetween]}>
                    <CheckBox label="Ingat saya" isChecked={isChecked} onPress={() => setIsChecked(!isChecked)} />
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordVerification")}>
                      <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textXS]}>Lupa kata sandi?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[BaseStyle.h40]} />
                  <Button text="Masuk" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={checkTextInput} />
                  <View style={[BaseStyle.h40]} />
                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#D9D9D9' }} />
                    <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.textCenter, BaseStyle.ph10]}>Atau masuk dengan</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#D9D9D9' }} />
                  </View> */}
                  <View style={[BaseStyle.h40]} />
                  {/* <Button text="Masuk dengan Google" color='#000000' backgroundColor='#FFFFFF' borderRadius={24} borderColor="#D9D9D9" width='100%' paddingVertical={14} icon={<IconGoogle width={18} height={18} />} />
                  {Platform.OS === 'ios' && (
                    <>
                      <View style={[BaseStyle.h10]} />
                      <Button text="Masuk dengan Apple" color='#000000' backgroundColor='#FFFFFF' borderRadius={24} borderColor="#D9D9D9" width='100%' paddingVertical={14} icon={<IconApple width={18} height={18} />} />
                    </>
                  )} */}
                </View>
              </View>
              <View style={[BaseStyle.justifyContentRight, ({ flex: 0.1 })]}>
                <View style={[BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter]}>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.textCenter]}>Belum punya akun </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textXS, BaseStyle.textCenter]}>Daftar?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {modalLoad &&
        <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, ({ flex: 1, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 300 })]}>
          <View style={[BaseStyle.absolute, BaseStyle.hAuto, BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.pb20, ({ alignSelf: 'center', top: '30%', width: '70%' })]}>
            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.h240, ({ backgroundColor: '#F9F9F9', borderTopLeftRadius: 40, borderTopRightRadius: 40 })]}>
              <IconSuccessGreen width='80%' height='80%' />
            </View>
            <View style={[BaseStyle.p20, ({ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 })]}>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.pb10]}>Tunggu beberapa saat!</Text>
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.pb10]}>Permintaan anda sedang diproses.</Text>
              <ActivityIndicator size="large" color="#208D33" />
            </View>
          </View>
        </View>
      }
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})