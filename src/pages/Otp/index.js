import { StyleSheet, Text, View, Modal, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTS
import { Button, TextInput } from '../../components/index.js';
import OTPTextView from 'react-native-otp-textinput';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconXMarkWhite, IconSuccessGreen } from '../../assets'

const height = Dimensions.get("window");

const Otp = ({navigation}) => {
  const route = useRoute();
  const { userName, email, phoneNumber, password, passwordConfirm, page } = route.params || {};
  const [phoneNumbers, setphoneNumbers] = useState(phoneNumber);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  // MODAL SUCCESS
  const [modalLoad, setModalLoad] = useState(false);

  // MODAL EDIT PHONE NUMBER
  const [modalEditPhoneNumber, setModalEditPhoneNumber] = useState(false);

  // BOTTOM SHEET
  const [isVisible, setIsVisible] = useState(false);
  
  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);

  // Check Text Input is Empty
  const [passCode, setPassCode] = useState('');
  const [passCodeBorderColor, setPassCodeBorderColor] = useState('#D9D9D9');
  const [passCodeWarning, setPassCodeWarning] = useState(false);
  const [passCodeWarningText, setPassCodeWarningText] = useState(false);

  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editPhoneNumberBorderColor, setEditPhoneNumberBorderColor] = useState('#D9D9D9');
  const [editPhoneNumberWarning, setEditPhoneNumberWarning] = useState('');
  const [editPhoneNumberFormatWarning, setEditPhoneNumberFormatWarning] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [lastChangeTimestamp, setLastChangeTimestamp] = useState(null);

  // OTP
  const [otp, setOtp] = useState('1234');

  // Cek jumlah perubahan dari AsyncStorage saat pertama kali komponen di-render
  useEffect(() => {
    const loadPhoneChangeData = async () => {
      const storedChangeCount = await AsyncStorage.getItem('phoneChangeCount');
      const storedLastTimestamp = await AsyncStorage.getItem('lastPhoneChangeTimestamp');

      if (storedChangeCount) setChangeCount(parseInt(storedChangeCount, 10));
      if (storedLastTimestamp) setLastChangeTimestamp(parseInt(storedLastTimestamp, 10));
    };

    loadPhoneChangeData();
  }, []);

  const checkTextInput = () => {
    let isValid = true;
  
    // Cek apakah OTP kosong
    if (!passCode.trim()) {
      setPassCodeWarning(true);
      setPassCodeWarningText("Masukkan kode OTP!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    // Cek apakah OTP harus 4 digit angka
    } else if (passCode.trim().length !== 4 || isNaN(passCode.trim())) {
      setPassCodeWarning(true);
      setPassCodeWarningText("OTP harus berisi 4 digit angka!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    // Cek apakah OTP cocok dengan kode yang dikirim
    } else if (passCode.trim() !== otp) {
      setPassCodeWarning(true);
      setPassCodeWarningText("Kode OTP tidak cocok!");
      setPassCodeBorderColor('#FF4D4D');
      isValid = false;
    // Jika semua validasi lolos
    } else {
      setPassCodeWarning(false);
      setPassCodeWarningText("");
      setPassCodeBorderColor('#D9D9D9');
    }
  
    if (isValid) {
      setModalLoad(true);
      setTimeout(() => {
        if(page === "SignUp"){
          navigation.replace('SignIn', {userName: userName, email: email, phoneNumber: phoneNumbers, password: password, passwordConfirm: passwordConfirm});
        }else{
          navigation.replace('ForgotPassword', {screen: "Home", params: {userName: userName, email: email, phoneNumber: phoneNumbers, passwords: password, passwordConfirms: passwordConfirm}});
        }
      }, 5000);
    }
  };

  const checkEditPhoneNumber = async () => {
    let isValid = true;
    const phoneRegex = /^(?:\+62|62|0)[2-9][0-9]{7,11}$/; // Regex validasi nomor HP Indonesia
    const now = Date.now();

    // Cek apakah 24 jam sudah berlalu sejak perubahan terakhir
    if (lastChangeTimestamp && now - lastChangeTimestamp >= 24 * 60 * 60 * 1000) {
      await AsyncStorage.setItem('phoneChangeCount', '0'); // Reset hitungan perubahan setelah 24 jam
      setChangeCount(0);
    }

    // Cek apakah user sudah mencapai batas perubahan
    if (changeCount >= 3) {
      setEditPhoneNumberWarning('Anda hanya bisa mengubah nomor telepon sebanyak 3 kali dalam 24 jam.');
      setEditPhoneNumberBorderColor('#FF4D4D');
      return;
    }

    // Cek apakah nomor telepon kosong
    if (!editPhoneNumber.trim()) {
      setEditPhoneNumberWarning('Masukan nomor telepon aktif!');
      setEditPhoneNumberBorderColor('#FF4D4D');
      isValid = false;
    // Cek apakah format nomor telepon valid
    } else if (!phoneRegex.test(editPhoneNumber)) {
      setEditPhoneNumberWarning('Format nomor telepon tidak valid!');
      setEditPhoneNumberFormatWarning(true);
      setEditPhoneNumberBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setEditPhoneNumberWarning('');
      setEditPhoneNumberBorderColor('#D9D9D9');
      setEditPhoneNumberFormatWarning(false);
    }

    if (isValid) {
      const newCount = changeCount + 1;
  
      // Simpan perubahan ke AsyncStorage
      await AsyncStorage.setItem('phoneChangeCount', newCount.toString());
      await AsyncStorage.setItem('lastPhoneChangeTimestamp', now.toString());
  
      setChangeCount(newCount);
      setLastChangeTimestamp(now);
      setphoneNumbers(editPhoneNumber);
      setModalLoad(true);
      setModalEditPhoneNumber(false);
  
      setTimeout(() => {
        setModalLoad(false);
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
                  <View style={[BaseStyle.w20, BaseStyle.w20]} />
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
                  <View style={{flex: 1}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textXL1, BaseStyle.textCenter]}>Verifikasi</Text>
                    <View style={[BaseStyle.pt40]}>
                      <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh20]}>Kami telah mengirimkan sms kode ke nomor telepon yang anda daftarkan ({phoneNumbers})</Text>
                      <View style={[BaseStyle.h10]} />
                      <View style={[BaseStyle.p10, BaseStyle.radius10, ({borderWidth: 1, borderColor: passCodeBorderColor})]}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb5]}>Kode OTP</Text>
                        <OTPTextView
                            inputCount={4}
                            tintColor='#208D33'
                            offTintColor='#D9D9D9'
                            textInputStyle={[BaseStyle.MaisonBold, BaseStyle.radius10, BaseStyle.textDarkGreen500, BaseStyle.borderDarkGreen500, ({borderWidth: 4})]}
                            handleTextChange={(value) => {setPassCode(value); setPassCodeWarning(false); setPassCodeWarningText(''); setPassCodeBorderColor('#D9D9D9');}}
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
                      <View style={[BaseStyle.alignItemsRight]}>
                        <TouchableOpacity onPress={openBottomSheet}>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textXS]}>Tidak menerima kode?</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[BaseStyle.h40]} />
                      <Button text="Lanjutkan" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={checkTextInput} />
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

      {modalEditPhoneNumber &&
        <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, ({flex: 1, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 300})]}>
          <View style={[BaseStyle.absolute, BaseStyle.hAuto, BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.pb10, ({alignSelf: 'center', top: '30%', width: '70%'})]}>
            <View style={[BaseStyle.p20, ({borderBottomLeftRadius: 40, borderBottomRightRadius: 40})]}>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.lh22, BaseStyle.pb10]}>Pastikan nomor yang Anda daftarkan valid dan aktif!</Text>
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.lh18, BaseStyle.pb20]}>Anda hanya bisa mengubah nomor sebanyak 3 kali</Text>
              <TextInput lable="Nomor Telepon" placeholder="Masukan nomor telepon aktif" inputMode="numeric" keyboardType="numeric" borderColor={editPhoneNumberBorderColor} onChangeText={(value) => {setEditPhoneNumber(value); setEditPhoneNumberWarning(''); setEditPhoneNumberBorderColor('#D9D9D9');}} />
              {editPhoneNumberWarning !== '' && (
                <View>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textRed, BaseStyle.textXS1, BaseStyle.mt5]}>{editPhoneNumberWarning}</Text>
                  {editPhoneNumberFormatWarning === true && (<Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mt5]}>contoh (6212345678 atau 0812345678)</Text>)}
                </View>
              )}
              <View style={[BaseStyle.h20]} />
              <Button text="Lanjutkan" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} onPress={checkEditPhoneNumber} />
              <View style={[BaseStyle.h10]} />
              <Button text="Batal" color="#FFFFFF" backgroundColor="#000000" borderRadius={24} paddingVertical={14} onPress={() => {setModalEditPhoneNumber(false);}} />
              <View style={[BaseStyle.h10]} />
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.lh18]}>Setelah melakukan perubahan nomor telepon sebanyak 3 kali. Tunggu 1x24jam untuk mengubah nomor telepon kembali.</Text>
            </View>
          </View>
        </View>
      }

      {/* BottomSheet Modal */}
      <Modal
        transparent
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <View style={styles.bottomSheetoverlay}>
          {/* Close Area */}
          <TouchableOpacity
            style={styles.bottomSheetcloseArea}
            onPress={closeBottomSheet}
          />

          {/* BottomSheet Content */}
          <Animated.View style={styles.bottomSheet}>
            <View style={[BaseStyle.alignItemsCenter, BaseStyle.pb20]}>
              <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({height: 4})]} />
            </View>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Verifikasi</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheet} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                <IconXMarkWhite width={12} height={12} />
              </TouchableOpacity>
            </View>
            <View style={[BaseStyle.mb20]}>
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.pb5]}>Pastikan nomor yang Anda daftarkan valid dan aktif!</Text>
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textGray300]}>Nomor Anda adalah ({phoneNumbers})</Text>
            </View>
            <Button text="Kirim kode lagi" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} />
            <View style={[BaseStyle.h10]} />
            {page === "SignUp" && (<Button text="Ganti nomor telepon" color="#FFFFFF" backgroundColor="#000000" borderRadius={24} paddingVertical={14} onPress={() => {closeBottomSheet(); setModalEditPhoneNumber(true);}} />)}
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default Otp

const styles = StyleSheet.create({
  // BOTTOM SHEET
  bottomSheetcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bottomSheetoverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  bottomSheetcloseArea: {
    flex: 1, // Area to detect clicks outside the bottom sheet
  },
  bottomSheet: {
    height: height * 0.4, // Bottom sheet height (40% of screen)
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1000, // Ensure the sheet stays on top
  },
})