import { StyleSheet, Text, View, Modal, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// COMPONENTS
import { TextInput, TextInputPassword, Button, CheckBox } from '../../components/index.js';
import ImagePicker from 'react-native-image-crop-picker';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconXMarkWhite, IconCameraGreen, IconUserGrey, IconUserLightGreen, IconMailGreen, IconPhoneGreen, IconCaretRightGreen, IconNotificationGreen, IconCartGreen, IconInformationGreen, IconHelpGreen, IconLogoutGreen, IconPrivacyGreen, IconImageGalleryGreen, IconTrashGreen, IconSuccessGreen } from '../../assets'

// API
import userData from '../../hook/user/userFetch.js'
import { getItem, removeItem } from '../../utils/localStorage.js';

const height = Dimensions.get("window");

const Profile = ({ navigation }) => {
  // USER DATA
  const { user, loadingUser, errorUser } = userData();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // MODAL SUCCESS
  const [modalLoad, setModalLoad] = useState(false);

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  // BOTTOM SHEET IMAGE PICKER
  const [isVisible, setIsVisible] = useState(false);
  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);

  // BOTTOM SHEET DELETE ACCOUNT
  const [isVisibleDeleteAccount, setIsVisibleDeleteAccount] = useState(false);
  const openBottomSheetDeleteAccount = () => setIsVisibleDeleteAccount(true);
  const closeBottomSheetDeleteAccount = () => setIsVisibleDeleteAccount(false);

  // Check Text Input is Empty
  const [email, setEmail] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('#D9D9D9');
  const [emailWarning, setEmailWarning] = useState('');

  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#D9D9D9');
  const [passwordWarning, setPasswordWarning] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  console.log('User Data: ', user);

  const checkTextInput = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk validasi email

    // Ambil user pertama dari array
    const userData = user

    // Cek apakah email kosong
    if (!email.trim()) {
      setEmailWarning('Masukan alamat email Anda!');
      setEmailBorderColor('#FF4D4D');
      isValid = false;
      // Cek apakah email memiliki format yang benar
    } else if (!emailRegex.test(email)) {
      setEmailWarning('Format email tidak valid!');
      setEmailBorderColor('#FF4D4D');
      isValid = false;
      // Cek apakah email cocok dengan user.email
    } else if (!userData || userData.email !== email) {
      setEmailWarning('Email dan password tidak cocok!');
      setEmailBorderColor('#FF4D4D');
      setPasswordBorderColor('#FF4D4D');
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
      // Cek apakah password cocok dengan user.password
    } else if (!userData || userData.password !== password) {
      setEmailWarning('Email dan password tidak cocok!');
      setEmailBorderColor('#FF4D4D');
      setPasswordBorderColor('#FF4D4D');
      isValid = false;
    } else {
      setPasswordWarning('');
      setPasswordBorderColor('#D9D9D9');
    }

    if (isValid) {
      setModalLoad(true);
      closeBottomSheetDeleteAccountConfirm();
      setTimeout(() => {
        navigation.replace('MainApp', { screen: 'Home' });
      }, 5000);
    }
  };

  // IMAGE PICKER
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    getItem('user').then((value) => {
      if (value) {
        console.log("user sebelum di-setState:", value);
      } else {
        navigation.navigate('SignIn');
      }
    }).catch((err) => {
      console.error("Error fetching user:", err);
    });
  }, []);

  useEffect(() => {
    if (!loadingUser && user) {
      setImage(user.profile);
    }
  }, [loadingUser, user]);

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage({ uri: image.path });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Could not pick the image');
        }
      });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage({ uri: image.path });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Could not take the photo');
        }
      });
  };

  const saveAvatar = () => {
    setModalLoad(true);
    setTimeout(() => {
      // setAvatar(image);
      setModalLoad(false);
    }, 3000);
  };

  const deleteAvatar = () => {
    setModalLoad(true);
    setTimeout(() => {
      // setAvatar(null);
      setModalLoad(false);
    }, 3000);
  };

  const logout = async () => {
    setModalLoad(true);
    await removeItem('token');
    await removeItem('user');

    console.log("Logout successful");

    navigation.replace('SignIn');
  }

  return (
    <View style={[BaseStyle.container]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ flex: 1 }} >
        <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

        {/* HEADER */}
        <View style={[BaseStyle.absolute, BaseStyle.wFull, navShadow >= 1 ? BaseStyle.navScroll : undefined, navShadow >= 1 ? BaseStyle.BgWhite : undefined, ({ paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, zIndex: 3 })]}>
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
            <View style={[BaseStyle.w20, BaseStyle.w20]} />
            <Text style={[BaseStyle.MaisonBold, navShadow >= 1 ? BaseStyle.textBlack : BaseStyle.textWhite, BaseStyle.textMD]}>Profil</Text>
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

          {user &&
            !loadingUser && (

              <View style={[BaseStyle.relative, BaseStyle.BgWhite, ({ paddingTop: 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: -30, zIndex: 1, minHeight: height * 0.76, flexGrow: 1, zIndex: 3 })]}>

                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.absolute, BaseStyle.BgWhite, BaseStyle.hAuto, BaseStyle.rectangle, BaseStyle.radiusCircle, ({ width: "40%", zIndex: 4, top: -75, left: "50%", transform: [{ translateX: "-50%" }] })]}>
                  {user.profile === null || user.profile === undefined || user.profile === 0 || user.profile === '' ?
                    <IconUserGrey width={120} height={120} /> :
                    <Image source={user.profile} style={[BaseStyle.hAuto, BaseStyle.rectangle, ({ width: "92%", borderRadius: 999 })]} />
                  }
                  <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.absolute, BaseStyle.w30, BaseStyle.h30, BaseStyle.radiusCircle, BaseStyle.BgWhite, BaseStyle.borderGray100, ({ zIndex: 5, top: "86%", left: "40%" })]} onPress={openBottomSheet} >
                    <IconCameraGreen width={20} height={20} />
                  </TouchableOpacity>
                </View>

                <View style={[BaseStyle.wrap, BaseStyle.pt90, BaseStyle.pb100, ({ flex: 1 })]}>
                  <View style={[BaseStyle.mb10]}>
                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Informasi Akun</Text>
                    <View style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]}>
                      <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                          <IconUserLightGreen width={24} height={24} />
                        </View>
                        <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>{user.name}</Text>
                      </View>
                      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({ height: 1 })]} />
                      <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                          <IconMailGreen width={24} height={24} />
                        </View>
                        <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>{user.email}</Text>
                      </View>
                      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({ height: 1 })]} />
                      <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                          <IconPhoneGreen width={24} height={24} />
                        </View>
                        <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>{user.phone}</Text>
                      </View>
                      <Button text="Edit" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} onPress={() => navigation.navigate("ProfileEdit", { name: user.name, email: user.email, phone: user.phone })} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={() => navigation.navigate("ForgotPasswordVerification")}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconPrivacyGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Privacy dan Keamanan</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconNotificationGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Notifikasi</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[BaseStyle.mb10]}>
                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Transaksi</Text>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={() => { navigation.navigate("OrderList") }}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconCartGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Pesanan Saya</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[BaseStyle.mb10]}>
                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Informasi Lainnya</Text>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={() => navigation.navigate("ApplicationInformation")}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconInformationGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Informasi Aplikasi</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={() => navigation.navigate("AdviceAndHelp")}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconHelpGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Saran dan Bantuan</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={openBottomSheetDeleteAccount}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconTrashGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Hapus Akun</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.p20, BaseStyle.radius10, BaseStyle.shadow, BaseStyle.mb10]} onPress={logout}>
                      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius10, BaseStyle.BgLightGreen200, BaseStyle.mr10]}>
                            <IconLogoutGreen width={24} height={24} />
                          </View>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textSM]}>Keluar</Text>
                        </View>
                        <IconCaretRightGreen width={18} height={18} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )
          }
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
              <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({ height: 4 })]} />
            </View>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Foto Profil</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheet} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                <IconXMarkWhite width={12} height={12} />
              </TouchableOpacity>
            </View>
            {user &&
              !loadingUser ? (
              <>

                <View>
                  <View style={[BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
                    {user.profile === null || user.profile === undefined || user.profile === 0 || user.profile === '' ?
                      <IconUserGrey width={120} height={120} /> :
                      <Image source={image} style={[BaseStyle.hAuto, BaseStyle.rectangle, ({ width: "60%", borderRadius: 999 })]} />
                    }
                  </View>
                  <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, ({ width: "30.3333333333%" })]}>
                      <IconCameraGreen width={24} height={24} />
                      <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.lh16, BaseStyle.pt5]} numberOfLines={1}>Kamera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, ({ width: "30.3333333333%" })]}>
                      <IconImageGalleryGreen width={24} height={24} />
                      <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.lh16, BaseStyle.pt5]} numberOfLines={1}>Gallery</Text>
                    </TouchableOpacity>
                    {user.profile === null || user.profile === undefined || user.profile === 0 || user.profile === '' ?
                      undefined :
                      <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, ({ width: "30.3333333333%" })]}>
                        <IconTrashGreen width={24} height={24} />
                        <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.lh16, BaseStyle.pt5]} numberOfLines={1}>Hapus Gambar Profil</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  {user.profile !== null && (
                    <View style={[BaseStyle.wFull, BaseStyle.mt10]}>
                      <Button text="Simpan Gambar" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} onPress={() => { saveAvatar() }} />
                    </View>
                  )}
                </View>

              </>
            ) : <></>
            }
          </Animated.View>
        </View>
      </Modal>

      {/* BottomSheet Modal Delete Account */}
      <Modal
        transparent
        visible={isVisibleDeleteAccount}
        animationType="slide"
        onRequestClose={closeBottomSheetDeleteAccount}
      >
        <View style={styles.bottomSheetoverlay}>
          {/* Close Area */}
          <TouchableOpacity
            style={styles.bottomSheetcloseArea}
            onPress={closeBottomSheetDeleteAccount}
          />

          {/* BottomSheet Content */}
          <Animated.View style={styles.bottomSheet}>
            <View style={[BaseStyle.alignItemsCenter, BaseStyle.pb20]}>
              <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({ height: 4 })]} />
            </View>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Hapus Akun</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheetDeleteAccount} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                <IconXMarkWhite width={12} height={12} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh20, BaseStyle.mb10]}>Mohon perhatikan bahwa setelah akun Anda dihapus, Anda tidak dapat memulihkannya kembali.</Text>
              <Button text="Lanjutkan Hapus Akun" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={() => { closeBottomSheetDeleteAccount(); navigation.navigate("DeleteAccount") }} />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default Profile

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
    height: height, // Bottom sheet height (40% of screen)
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1000, // Ensure the sheet stays on top
  },
})