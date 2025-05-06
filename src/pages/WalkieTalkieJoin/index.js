import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Share, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { TextInput, TimePickerInput, Button, DatePickerInput } from '../../components/index.js';
import OTPTextView from 'react-native-otp-textinput';

// ICON
import { IconArrowLeftWhite, IconCaretLeftWhite, IconSuccessGreen } from '../../assets/icon'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

const WalkieTalkieJoinJoin = ({ navigation }) => {
  // AMBIL ID CERITA BAITULLAH
  const route = useRoute();
  const { idRoom, imageUser, userName, role, passCodeNumber, periodDate, periodTime, hostName, channelName, channelCode } = route.params || {};

  let passCodeNumberString = passCodeNumber.toString();

  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // MODAL SUCCESS CREAT CHANNEL
  const [modalLoad, setModalLoad] = useState(false);

  // Check Text Input is Empty
  const [passCode, setPassCode] = useState('');
  const [passCodeBorderColor, setPassCodeBorderColor] = useState('#B1B1BC');
  const [passCodeWarning, setPassCodeWarning] = useState(false);
  const [passCodeWarningText, setPassCodeWarningText] = useState(false);
  console.log(typeof passCode);

  const checkTextInput = () => {
    let isValid = true;

    if (!passCode.trim()) {
      setPassCodeWarning(true)
      setPassCodeWarningText("Masukan passcode!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    } else if (passCode.trim().length !== 4 || isNaN(passCode.trim())) {
      setPassCodeWarning(true)
      setPassCodeWarningText("Passcode harus berisi 4 digit angka!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    } else if (passCode !== passCodeNumberString) {
      setPassCodeWarning(true)
      setPassCodeWarningText("Passcode salah!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPassCodeWarning(false);
      setPassCodeWarningText("");
      setPassCodeBorderColor('#B1B1BC');
    }

    if (isValid) {
      setModalLoad(true);

      navigation.replace('WalkieTalkieRoom', { idRoom, role: role, periodDate, periodTime, hostName, channelName, channelCode, passCode });
    }
  };

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow === true ? BaseStyle.navScroll : undefined,
          ({
            paddingTop: (StatusBar.currentHeight || 20) + 10,
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
        <View style={[BaseStyle.pb10, BaseStyle.BgTrasnparent]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS]}>WALKIE TALKIE</Text>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXL1]}>Gabung Room Walkie Talkie</Text>
        </View>
      </View>

      {/* Konten ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          let offset = e.nativeEvent.contentOffset.y
          if (offset >= 1) {
            setNavShadow(true)
          } else {
            setNavShadow(false)
          }
        }}
      >
        <View style={{ paddingTop: headerHeight * 1.5, paddingHorizontal: 14, backgroundColor: '#2CA44B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
        <View style={[BaseStyle.wrap, BaseStyle.relative, ({ top: headerHeight * -0.4 })]}>
          <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p20, BaseStyle.radius10, BaseStyle.mb20]}>
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mb10]}>Isi form berikut untuk gabung channel walkie talkie</Text>
            <View style={[BaseStyle.p10, BaseStyle.radius10, ({ borderWidth: 1, borderColor: passCodeBorderColor })]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb5]}>Masukan Passcode</Text>
              <OTPTextView
                inputCount={4}
                tintColor='#208D33'
                offTintColor='#D9D9D9'
                textInputStyle={[BaseStyle.MaisonBold, BaseStyle.radius10, BaseStyle.textDarkGreen500, BaseStyle.borderDarkGreen500, ({ borderWidth: 4 })]}
                handleTextChange={(value) => { setPassCode(value); setPassCodeWarning(false); setPassCodeWarningText(''); setPassCodeBorderColor('#B1B1BC'); }}
              />
            </View>
            {passCodeWarning === true ? (
              <>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{passCodeWarningText}</Text>
              </>
            ) : (
              <></>
            )
            }
            <View style={[BaseStyle.h10]} />
            <Button text="Gabung Channel" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} paddingVertical={14} onPress={checkTextInput} />
          </View>
        </View>
      </ScrollView>

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

export default WalkieTalkieJoinJoin

const styles = StyleSheet.create({})