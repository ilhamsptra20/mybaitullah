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
import useTawafChannelCreate from '../../hook/useTawafChannelCreate.js';

const CreateWalkieTalkieChannel = ({ navigation }) => {
  // AMBIL ID CERITA BAITULLAH
  const route = useRoute();
  const { imageUser, userName } = route.params || {};

  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // MODAL SUCCESS CREAT CHANNEL
  const [modalLoad, setModalLoad] = useState(false);

  // Check Text Input is Empty
  const [channelName, setChannelName] = useState('');
  const [channelNameBorderColor, setChannelNameBorderColor] = useState('#D9D9D9');
  const [channelNameWarning, setChannelNameWarning] = useState(false);

  const [travelName, setTravelName] = useState('');
  const [travelNameBorderColor, setTravelNameBorderColor] = useState('#D9D9D9');
  const [travelNameWarning, setTravelNameWarning] = useState(false);

  const [endDate, setEndDate] = useState(null);
  const [endDateBorderColor, setEndDateBorderColor] = useState('#D9D9D9');
  const [endDateWarning, setEndDateWarning] = useState(false);

  const [time, setTime] = useState(null);
  const [timeBorderColor, setTimeBorderColor] = useState('#D9D9D9');
  const [timeWarning, setTimeWarning] = useState(false);

  const [passCode, setPassCode] = useState('');
  const [passCodeBorderColor, setPassCodeBorderColor] = useState('#D9D9D9');
  const [passCodeWarning, setPassCodeWarning] = useState(false);
  const [passCodeWarningText, setPassCodeWarningText] = useState(false);

  const { createTawafChannel, loadingCreateTawafChannel, errorCreateTawafChannel, dataCreateTawafChannel } = useTawafChannelCreate();

  const checkTextInput = async () => {
    let isValid = true;

    if (!channelName.trim()) {
      setChannelNameWarning(true);
      setChannelNameBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setChannelNameWarning(false);
      setChannelNameBorderColor('#D9D9D9');
    }

    // if (!travelName.trim()) {
    //   setTravelNameWarning(true);
    //   setTravelNameBorderColor('#FF4D4D');
    //   isValid = false;
    // } else {
    //   setTravelNameWarning(false);
    //   setTravelNameBorderColor('#D9D9D9');
    // }

    if (!endDate) {
      setEndDateWarning(true);
      setEndDateBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setEndDateWarning(false);
      setEndDateBorderColor('#D9D9D9');
    }

    if (!time) {
      setTimeWarning(true);
      setTimeBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setTimeWarning(false);
      setTimeBorderColor('#D9D9D9');
    }

    if (!passCode.trim()) {
      setPassCodeWarning(true)
      setPassCodeWarningText("Buat passcode anda!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    } else if (passCode.trim().length !== 4 || isNaN(passCode.trim())) {
      setPassCodeWarning(true)
      setPassCodeWarningText("Passcode harus berisi 4 digit angka!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPassCodeWarning(false);
      setPassCodeWarningText("");
      setPassCodeBorderColor('#D9D9D9');
    }

    if (isValid) {
      setModalLoad(true);
      let formattedDate = new Date(endDate).toISOString().split("T")[0]; // Format YYYY-MM-DD
      let formattedTime = time.toString().slice(0, 5); // Ambil HH:mm saja  
      let dataTawaflive = {
        nama_channel: channelName,
        tanggal_selesai: `${formattedDate} ${formattedTime}`,
        passcode: passCode
      };

      // createTawafChannel
      try {
        // Menunggu hasil createTawafChannel
        const { success, data, error } = await createTawafChannel(dataTawaflive);

        if (success) {
          setModalLoad(false);
          console.log('dataCreateTawafChannel: ', data);

          navigation.replace('TawafLiveStatus', {
            idTawafChannel: data.id,
            channelName,
            travelName,
            imageUser,
            userName,
            endDate: formattedDate, // Gunakan formattedDate
            time: formattedTime, // Gunakan formattedTime
            passCode
          });

        } else {
          setModalLoad(false);
          console.log('errorCreateTawafChannel: ', error);
        }
      } catch (error) {
        setModalLoad(false);
        console.log('Terjadi kesalahan: ', error);
      }

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
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXL1]}>Buat channel lalu siaran</Text>
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
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mb10]}>Isi form berikut untuk membuat channel walkie talkie Anda</Text>
            <TextInput lable="Nama Channel" placeholder="Masukan nama channel tawaf live Anda" borderColor={channelNameBorderColor} onChangeText={(value) => { setChannelName(value); setChannelNameWarning(false); setChannelNameBorderColor('#D9D9D9'); }} maxLength={50} characterLength={true} characterMax={channelName.length} />
            {channelNameWarning === true ? (
              <>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Buat nama channel Anda!</Text>
              </>
            ) : (
              <></>
            )
            }
            <View style={[BaseStyle.h10]} />
            <TextInput lable="Nama Travel" placeholder="Masukan nama Travel" borderColor={travelNameBorderColor} onChangeText={(value) => { setTravelName(value); setTravelNameWarning(false); setTravelNameBorderColor('#D9D9D9'); }} />
            {travelNameWarning === true ? (
              <>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Masukan nama Travel!</Text>
              </>
            ) : (
              <></>
            )
            }
            <View style={[BaseStyle.h10]} />
            <DatePickerInput lable="Tanggal Berakhir" borderColor={endDateBorderColor} onChange={(value) => { setEndDate(value); setEndDateWarning(false); setEndDateBorderColor('#D9D9D9'); }} minimumDate={new Date()} />
            {endDateWarning === true ? (
              <>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Tambahkan tanggal berakhirnya channel!</Text>
              </>
            ) : (
              <></>
            )
            }
            <View style={[BaseStyle.h10]} />
            <TimePickerInput lable="Waktu Berakhir" borderColor={timeBorderColor} onChange={(value) => { setTime(value); setTimeWarning(false); setTimeBorderColor('#D9D9D9'); }} endDate={endDate !== null ? endDate : null} setEndDateWarning={setEndDateWarning} setEndDateBorderColor={setEndDateBorderColor} />
            {timeWarning === true ? (
              <>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>Tambahkan waktu berakhirnya channel!</Text>
              </>
            ) : (
              <></>
            )
            }
            <View style={[BaseStyle.h10]} />
            {/* <TextInput lable="Passcode" placeholder="Buat passcode channel tawaf live Anda" inputMode='numeric' borderColor={passCodeBorderColor} onChangeText={(value) => {setPassCode(value); setPassCodeWarning(false); setPassCodeBorderColor('#D9D9D9');}} /> */}
            <View style={[BaseStyle.p10, BaseStyle.radius10, ({ borderWidth: 1, borderColor: passCodeBorderColor })]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb5]}>Buat Passcode</Text>
              <OTPTextView
                inputCount={4}
                tintColor='#208D33'
                offTintColor='#D9D9D9'
                textInputStyle={[BaseStyle.MaisonBold, BaseStyle.radius10, BaseStyle.textDarkGreen500, BaseStyle.borderDarkGreen500, ({ borderWidth: 4 })]}
                handleTextChange={(value) => { setPassCode(value); setPassCodeWarning(false); setPassCodeWarningText(''); setPassCodeBorderColor('#D9D9D9'); }}
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
            <Button text="Buat Channel" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} paddingVertical={14} onPress={checkTextInput} />
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mt10]}>Setelah channel dibuat, tunggu hingga channel aktif selama 1x24jam</Text>
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mt5]}>Minimal waktu berakhir adalah 1 jam dari channel dibuat dan aktif.</Text>
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

export default CreateWalkieTalkieChannel

const styles = StyleSheet.create({})