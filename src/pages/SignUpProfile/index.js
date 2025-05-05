import { StyleSheet, Text, View, Animated, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

// COMPONENTS
import {TextInput, TextInputPassword, Button, CheckBox} from '../../components/index.js';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IlustrationPattern6, IconArrowLeftWhite, IconArrowLeftBlack, IconGoogle, IconApple, IconSuccessGreen, IconUserGrey02, IconUserGrey } from '../../assets'

// API
import userData from '../../hook/user/userFetch.js'

const SignInProfile = ({navigation}) => {
  const route = useRoute();
  const { userName, email, phoneNumber, password, passwordConfirm } = route.params || {};

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

  const [image, setImage] = useState(null);

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
                    <View style={{flex: 0.1}}>
                      <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textXL1, BaseStyle.textCenter]}>Lengkapi Profil Anda</Text>
                    </View>
                  <View style={{flex: 0.8}}>
                    <View style={[BaseStyle.pt40]}>
                      {image === null ? (
                          <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.rectangle, BaseStyle.radiusCircle, BaseStyle.borderGray200]}>
                            <IconUserGrey width={100} height={100} />
                          </View>
                        ) : (
                          <Image source={image} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.rectangle, ({borderRadius: 9999})]} />
                        )
                      }
                    </View>
                  </View>
                  <View style={{flex: 0.1}}>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                      <TouchableOpacity style={[BaseStyle.alignItemsCenter, BaseStyle.pr10, ({width: '33.3333333333%'})]} onPress={takePhotoFromCamera}>
                        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Pilih foto dari kamera</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[BaseStyle.alignItemsCenter, BaseStyle.ph10, ({width: '33.3333333333%'})]} onPress={pickImageFromGallery}>
                        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Pilih foto dari gallery</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[BaseStyle.alignItemsCenter, BaseStyle.pl10, ({width: '33.3333333333%'})]} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textSM, BaseStyle.textRight]} numberOfLines={1} ellipsizeMode="tail">Lewati</Text>
                      </TouchableOpacity>
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

export default SignInProfile

const styles = StyleSheet.create({})