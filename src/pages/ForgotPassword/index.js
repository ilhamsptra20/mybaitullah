import { StyleSheet, Text, View, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENTS
import {TextInput, TextInputPassword, Button, CheckBox, IndicatorBar} from '../../components/index.js';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconArrowLeftWhite, IconArrowLeftBlack, IconGoogle, IconApple, IconCheckGreen, IconXMarkRed, IconSuccessGreen } from '../../assets'

const ForgotPassword = ({navigation}) => {
  const route = useRoute();
  const { userName, email, phoneNumber, passwords, passwordConfirms } = route.params || {};

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  // MODAL SUCCESS
  const [modalLoad, setModalLoad] = useState(false);
  
  // Check Text Input is Empty
  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#D9D9D9');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [passwordValidatioCharacterLength, setPasswordValidationCharacterLength] = useState(false);
  const [passwordValidatioCharacterUppercase, setPasswordValidationCharacterUppercase] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmBorderColor, setPasswordConfirmBorderColor] = useState('#D9D9D9');
  const [passwordConfirmWarning, setPasswordConfirmWarning] = useState('');
  const [isPasswordConfirmDisabled, setIsPasswordConfirmDisabled] = useState(false);

  const checkTextInput = () => {
    let isValid = true;
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/; // Regex validasi password

    // Validasi password
    if (!password.trim()) {
      setPasswordWarning('Buat kata sandi Anda!');
      setPasswordBorderColor('#FF4D4D');
      setPasswordValidationCharacterLength(false);
      setPasswordValidationCharacterUppercase(false);
      isValid = false;
    } else {
      let isPasswordValid = true;

      // Cek apakah password kurang dari 6 karakter
      if (password.length < 6) {
        setPasswordValidationCharacterLength(false);
        isValid = false;
        isPasswordValid = false;
      } else {
        setPasswordValidationCharacterLength(true);
      }

      // Cek apakah password memiliki karakter huruf besar
      if (!/[A-Z]/.test(password)) {
        setPasswordValidationCharacterUppercase(false);
        isValid = false;
        isPasswordValid = false;
      } else {
        setPasswordValidationCharacterUppercase(true);
      }

      if (isPasswordValid) {
        setPasswordWarning('');
        setPasswordBorderColor('#D9D9D9');
        setIsPasswordConfirmDisabled(true);
      }
    }

    // Cek apakah password kosong
    if (!passwordConfirm.trim()) {
      setPasswordConfirmWarning('Buat kata sandi Anda!');
      setPasswordConfirmBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPasswordConfirmWarning('');
      setPasswordConfirmBorderColor('#D9D9D9');
    }

    // Cek apakah password dan konfirmasi password sama
    if(password.trim() && passwordConfirm.trim() && password !== passwordConfirm) {
      setPasswordWarning('Kata sandi tidak cocok!');
      setPasswordBorderColor('#FF4D4D');
      setPasswordConfirmWarning('Kata sandi tidak cocok!');
      setPasswordConfirmBorderColor('#FF4D4D');
      isValid = false;
    }

    if (isValid) {
      setModalLoad(true);
      setTimeout(() => {
        navigation.replace('SignIn', {password: password, passwordConfirm: passwordConfirm});
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
                  <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.navigate("SignIn")}>
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
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textXL1, BaseStyle.textCenter]}>Ubah Kata Sandi</Text>
                    <View style={[BaseStyle.pt40]}>
                      <TextInputPassword lable="Kata Sandi" placeholder="Buat kata sandi baru Anda" borderColor={passwordBorderColor} onChangeText={(value) => {setPassword(value); setPasswordWarning(''); setPasswordBorderColor('#D9D9D9'); setIsPasswordConfirmDisabled(true); setPasswordValidationCharacterLength(value.length >= 6); setPasswordValidationCharacterUppercase(/[A-Z]/.test(value));}} />
                      {passwordWarning !== '' && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{passwordWarning}</Text>)}
                      {password.trim() !== '' && (
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mv5]}>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mr10]}>
                            {passwordValidatioCharacterLength === true ? <IconCheckGreen width={12} height={12} /> : <IconXMarkRed width={12} height={12} />}
                            <Text style={[BaseStyle.MaisonBook, passwordValidatioCharacterLength === true ? BaseStyle.textDarkGreen500 : BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.ml5]}>Minimal 6 karakter</Text>
                          </View>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                            {passwordValidatioCharacterUppercase === true ? <IconCheckGreen width={12} height={12} /> : <IconXMarkRed width={12} height={12} />}
                            <Text style={[BaseStyle.MaisonBook, passwordValidatioCharacterUppercase === true ? BaseStyle.textDarkGreen500 : BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.ml5]}>Gunakan huruf besar</Text>
                          </View>
                        </View>
                      )}
                      {password.trim() !== '' && (
                        <IndicatorBar progress={password.length < 6 || !/[A-Z]/.test(password) ? 50 : 100} />
                      )}
                      <View style={[BaseStyle.h10]} />
                      <TextInputPassword lable="Konfirmasi Kata Sandi" placeholder="Konfirmasi kata sandi Anda" editable={password !== '' ? isPasswordConfirmDisabled : false} borderColor={passwordConfirmBorderColor} onChangeText={(value) => {setPasswordConfirm(value); setPasswordConfirmWarning(''); setPasswordConfirmBorderColor('#D9D9D9');}} />
                      {passwordConfirmWarning !== '' && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{passwordConfirmWarning}</Text>)}
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

export default ForgotPassword

const styles = StyleSheet.create({})