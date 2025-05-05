import { StyleSheet, Text, View, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'

// COMPONENTS
import {TextInput, TextInputPassword, Button, CheckBox, IndicatorBar} from '../../components/index.js';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconArrowLeftWhite, IconArrowLeftBlack, IconGoogle, IconApple, IconCheckGreen, IconXMarkRed, IconSuccessGreen } from '../../assets'

// API
import userData from '../../hook/user/userFetch.js'

const ForgotPasswordVerification = ({navigation}) => {
  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  // MODAL SUCCESS
  const [modalLoad, setModalLoad] = useState(false);
  
  // Check Text Input is Empty
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState('#D9D9D9');
  const [phoneNumberWarning, setPhoneNumberWarning] = useState('');
  const [phoneNumberFormatWarning, setPhoneNumberFormatWarning] = useState(false);

  const checkTextInput = () => {
    let isValid = true;
    const phoneRegex = /^(?:\+62|62|0)[2-9][0-9]{7,11}$/; // Regex validasi nomor HP Indonesia
  
    // Cek apakah nomor telepon kosong
    if (!phoneNumber.trim()) {
      setPhoneNumberWarning('Masukan nomor telepon aktif!');
      setPhoneNumberBorderColor('#FF4D4D');
      isValid = false;
    // Cek apakah format nomor telepon valid
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberWarning('Format nomor telepon tidak valid!');
      setPhoneNumberFormatWarning(true);
      setPhoneNumberBorderColor('#FF4D4D');
      isValid = false;
    // Cek apakah nomor telepon ada di user.phone
    } else if (!user.some((u) => u.phone === phoneNumber)) {
      setPhoneNumberWarning("Nomor telepon belum terdaftar!");
      setPhoneNumberBorderColor("#FF4D4D");
      isValid = false;
    } else {
      setPhoneNumberWarning('');
      setPhoneNumberBorderColor('#D9D9D9');
      setPhoneNumberFormatWarning(false);
    }

    if (isValid) {
      setModalLoad(true);
      setTimeout(() => {
        const currentUser = user.find((u) => u.phone === phoneNumber);
        navigation.replace('Otp', {userName: user[0].userName, email: user[0].email, phoneNumber: phoneNumber, password: user[0].password, passwordConfirm: user[0].password, page: "ForgotPasswordVerification"});
      }, 5000);
    }
  };

  return (
    <View style={[BaseStyle.container]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ flex: 1 }} >
          <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

          {/* HEADER */}
          <View style={[BaseStyle.absolute, BaseStyle.wFull, navShadow >= 1 ? BaseStyle.navScroll : undefined, navShadow >= 1 ? BaseStyle.BgWhite : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, zIndex: 3})]}>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
                  <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
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
            <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape, BaseStyle.BgOverlay, ({top: 0, zIndex: 2})]} />
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
            <View style={[BaseStyle.relative, BaseStyle.BgWhite, ({paddingTop: 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: -30, zIndex: 1, minHeight: height * 0.76, flexGrow: 1, zIndex: 3})]}>
                <View style={[BaseStyle.wrap, ({flex: 1})]}>
                  <View style={{flex: 0.9}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textXL1, BaseStyle.textCenter]}>Verifikasi</Text>
                    <View style={[BaseStyle.pt40]}>
                      <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh20]}>Masukan nomor telepon yang tertaut pada akun MyBaitullah Anda</Text>
                      <View style={[BaseStyle.h10]} />
                      <TextInput lable="Nomor Telepon" keyboardType="numeric" inputMode="numeric" autoComplete="tel" placeholder="Masukan nomor telepon" borderColor={phoneNumberBorderColor} onChangeText={(value) => {setPhoneNumber(value); setPhoneNumberWarning(''); setPhoneNumberBorderColor('#D9D9D9');}} />
                      {phoneNumberWarning !== '' && (
                        <View>
                          <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{phoneNumberWarning}</Text>
                          {phoneNumberFormatWarning === true && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mt5]}>contoh (6212345678 atau 0812345678)</Text>)}
                        </View>
                      )}
                      <View style={[BaseStyle.h40]} />
                      <Button text="Lanjutkan" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={checkTextInput} />
                      <View style={[BaseStyle.h40]} />
                    </View>
                  </View>
                </View>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>

      {modalLoad &&
        <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, ({flex: 1, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 300})]}>
          <View style={[BaseStyle.absolute, BaseStyle.hAuto, BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.pb20, ({alignSelf: 'center', top: '30%', width: '70%'})]}>
            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.h240, ({backgroundColor: '#F9F9F9', borderTopLeftRadius: 40, borderTopRightRadius: 40})]}>
              <IconSuccessGreen width='80%' height='80%' />
            </View>
            <View style={[BaseStyle.p20, ({borderBottomLeftRadius: 40, borderBottomRightRadius: 40})]}>
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

export default ForgotPasswordVerification

const styles = StyleSheet.create({})