import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Share, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { TextInput, TimePickerInput, Button, DatePickerInput } from '../../components/index.js';
import OTPTextView from 'react-native-otp-textinput';

// ICON
import {IconArrowLeftWhite, IconCaretLeftWhite, IconSuccessGreen} from '../../assets/icon'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

const ProfileEdit = ({navigation}) => {
  // AMBIL ID CERITA BAITULLAH
  const route = useRoute();
  const { userName, email, phone } = route.params || {};

  const width = Dimensions.get('window').width;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // MODAL SUCCESS CREAT CHANNEL
  const [modalLoad, setModalLoad] = useState(false);

  // Check Text Input is Empty
  const [name, setName] = useState(userName);
  const [nameBorderColor, setNameBorderColor] = useState('#D9D9D9');
  const [nameWarning, setNameWarning] = useState(false);

  const [mail, setMail] = useState(email);
  const [mailBorderColor, setMailBorderColor] = useState('#D9D9D9');
  const [mailWarning, setMailWarning] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState('#D9D9D9');
  const [phoneNumberWarning, setPhoneNumberWarning] = useState(false);

  const checkTextInput = () => {
    let isValid = true;
  
    if (!name.trim()) {
      setNameWarning(true);
      setNameBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setNameWarning(false);
      setNameBorderColor('#D9D9D9');
    }

    if (!mail.trim()) {
      setMailWarning(true);
      setMailBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setMailWarning(false);
      setMailBorderColor('#D9D9D9');
    }
  
    if (!phoneNumber) {
      setPhoneNumberWarning(true);
      setPhoneNumberBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPhoneNumberWarning(false);
      setPhoneNumberBorderColor('#D9D9D9');
    }

    if (isValid) {
      setModalLoad(true);
      setTimeout(() => {
        navigation.replace('MainApp', {screen: "Profil", userName: name, email: mail, phone: phoneNumber});
      }, 5000);
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
            borderBottomRightRadius: 6})
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
        <View style={[BaseStyle.pl20, ({width: '100%'})]}>
          <View>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS]}>PROFIL</Text>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXL1]}>Ubah profil Anda</Text>
          </View>
        </View>
      </View>

      {/* Konten ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          let offset = e.nativeEvent.contentOffset.y
          if(offset >= 1){
            setNavShadow(true)
          }else{
            setNavShadow(false)
          }
        }}
      >
        <View style={{paddingTop: headerHeight * 1.5, paddingHorizontal: 14, backgroundColor: '#2CA44B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} />
        <View style={[BaseStyle.wrap, BaseStyle.relative, ({top: headerHeight * -0.4})]}>
          <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p20, BaseStyle.radius10, BaseStyle.mb20]}>
            <TextInput lable="Nama Lengkap" placeholder="Masukan nama Anda" borderColor={nameBorderColor} onChangeText={(value) => {setName(value); setNameWarning(false); setNameBorderColor('#D9D9D9');}} value={name} />
            {nameWarning === true ? (
                <>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Masukan nama lengkap Anda!</Text>
                </>
              ) : (
                <></>
              )
            }
            <View style={[BaseStyle.h10]} />
            <TextInput lable="Alamat Email" keyboardType="email-address" autoCapitalize="none" autoComplete="email" editable={false} placeholder="Masukan alamat email" borderColor={mailBorderColor} onChangeText={(value) => {setMail(value); setMailWarning(false); setMailBorderColor('#D9D9D9');}} value={mail} />
            {mailWarning === true ? (
                <>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Masukan alamat email Anda!</Text>
                </>
              ) : (
                <></>
              )
            }
            <View style={[BaseStyle.h10]} />
            <TextInput lable="Nomor Telepon" keyboardType="numeric" inputMode="numeric" autoComplete="tel" editable={false} placeholder="Masukan nomor telepon aktif" borderColor={phoneNumberBorderColor} onChangeText={(value) => {setPhoneNumber(value); setPhoneNumberWarning(false); setPhoneNumberBorderColor('#D9D9D9');}} value={phoneNumber} />
            {phoneNumberWarning === true ? (
                <>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Masukan nomor telepon Anda!</Text>
                </>
              ) : (
                <></>
              )
            }
            <View style={[BaseStyle.h10]} />
            <Button text="Simpan" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} paddingVertical={14} onPress={checkTextInput} />
          </View>
        </View>
      </ScrollView>
      
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

export default ProfileEdit

const styles = StyleSheet.create({})