import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground, Modal, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button, DatePickerInput, RadioButton, TextInput } from '../../components/index.js';
import LinearGradient from 'react-native-linear-gradient';

// ICON
import {LogoBankBCA, IlustrationPattern5, IconXMarkBlack, IconBiodataNonactive, IconQrcodeActive, IconBayarNonactive, IlustrationSuccess, IlustrationPending, IconWarningGreen} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API

// DIMENSION
const height = Dimensions.get("window");

const OrderStatus = ({navigation, initialMinutes = 1, deadline="2025-03-08 15:30:00"}) => {
  // AMBIL ID TICKET
  const route = useRoute();
  const {idTicket} = route.params

  // AMBIL METODE PEMBAYARAN
  const [paymentMethod, setPaymentMethod] = useState()

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // PACKAGE HEIGHT COMPONENT
  const [ticketComponentHeight, setTicketComponentHeight] = useState(0);

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // KONFIRMASI PEMBAYARAN
  const [paymentProcess, setPaymentProcess] = useState(true)

  // TIMER
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = new Date(deadline).getTime();
    return Math.max(0, Math.floor((targetTime - now) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // BOTTOM SHEET
  const [isVisible, setIsVisible] = useState(false);
  
  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);
    
  return (
    <View style={[BaseStyle.container, BaseStyle.relative]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.BgWhite : BaseStyle.BgTrasnparent, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
          <View style={[BaseStyle.w30, BaseStyle.w30]} />
          <Text style={[BaseStyle.MaisonBold, navShadow === true ? BaseStyle.textBlack : BaseStyle.textWhite, BaseStyle.textXL]}>Pesanan</Text>
          <View style={[BaseStyle.w30, BaseStyle.w30]} />
        </View>
      </View>

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
        <ImageBackground source={IlustrationPattern5} style={[BaseStyle.relative, BaseStyle.wFull, BaseStyle.h180, ({paddingTop: StatusBar.currentHeight})]} imageStyle={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
          {/* STEP */}
          <View style={[BaseStyle.wrap, ({paddingTop: 60})]}>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
              <View style={[BaseStyle.w70, BaseStyle.alignItemsCenter]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.borderWhite, BaseStyle.mb5, ({width: 24, height: 24, borderRadius: 24})]}>
                  <IconBiodataNonactive width={16} height={16} />
                </View>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.textCenter]}>STEP 1</Text>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Biodata</Text>
              </View>
              <View style={[BaseStyle.dashedBorderBox, ({width: '20%', borderColor: '#FFFFFF'})]} />
              <View style={[BaseStyle.w70, BaseStyle.alignItemsCenter]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.borderWhite, BaseStyle.mb5, ({width: 24, height: 24, borderRadius: 24})]}>
                  <IconBayarNonactive width={12} height={12} />
                </View>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.textCenter]}>STEP 2</Text>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Bayar</Text>
              </View>
              <View style={[BaseStyle.dashedBorderBox, ({width: '20%', borderColor: '#FFFFFF'})]} />
              <View style={[BaseStyle.w70, BaseStyle.alignItemsCenter]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.mb5, ({width: 24, height: 24, borderRadius: 24})]}>
                  <IconQrcodeActive width={14} height={14} />
                </View>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.textCenter]}>STEP 3</Text>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Pesanan</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View
          style={[BaseStyle.relative, BaseStyle.wrap, BaseStyle.alignItemsCenter, BaseStyle.index1, ({marginTop: -30})]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setTicketComponentHeight(height);
          }}
        >
          <View style={[BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p30, BaseStyle.radius10, BaseStyle.wFull]}>
            {paymentProcess === true ? (
              <View style={[BaseStyle.wFull]}>
                <View style={[BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                  <IlustrationSuccess width={140} height={140} />
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textLG, BaseStyle.textCenter, BaseStyle.mb10, BaseStyle.mt20]}>Pesanan BERHASIL</Text>
                  <Text style={[BaseStyle.alignItemsLeft, BaseStyle.wFull, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10]}>Ringkasan Pembelian</Text>
                  <View style={[BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100]}>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                      <View style={{width: '40%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nomor Pesanan</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>123456789</Text>
                      </View>
                      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                    </View>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                      <View style={{width: '40%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Tanggal Pesanan</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>11 Februari 2025</Text>
                      </View>
                      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                    </View>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                      <View style={{width: '40%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Paket</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>Muslim Life Fest</Text>
                      </View>
                      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                    </View>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                      <View style={{width: '40%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1]}>Total</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textRight]}>Rp. 1.600.000</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[BaseStyle.alignItemsCenter, BaseStyle.mt40, BaseStyle.wFull]}>
                    <Button text="Lihat Tiket" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('OrderQrCode', {idTicket: idTicket})} />
                    <View style={[BaseStyle.h10]} />
                    <Button text="Kembali ke Beranda" color="#33C060" backgroundColor='#FFFFFF' borderColor='#33C060' borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('MainApp', {screen: 'Home'})} />
                  </View>
                </View>
              </View>
              ) : (
                <View style={[BaseStyle.wFull]}>
                  {timeLeft > 0 ? (
                      <View style={[BaseStyle.wFull]}>
                        <View style={[BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                          <View style={[BaseStyle.alignItemsCenter, BaseStyle.mb20]}>
                            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Menunggu Pembayaran</Text>
                            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.textCenter, BaseStyle.lh24, BaseStyle.mb5]}>Selesaikan Pembayaran Sebelum Waktu Habis</Text>
                            <LinearGradient colors={['#205374', '#C8FF00', '#33C060']} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.shadow, ({width: 100, height: 100, borderRadius: 100})]}>
                              <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w90, BaseStyle.h90, BaseStyle.radiusCircle, BaseStyle.p10, BaseStyle.BgWhite]}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textMD]}>{formatTime(timeLeft)}</Text>
                              </View>
                            </LinearGradient>
                          </View>
                          <View style={[BaseStyle.row, BaseStyle. alignItemsCenter, BaseStyle.wFull, BaseStyle.p10, BaseStyle.BgGray100, BaseStyle.radius10, BaseStyle.mb10]}>
                            <IconWarningGreen width={18} height={18} />
                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.ml10]}>Pembayaran dapat dilakukan dalam 1x24 jam</Text>
                          </View>
                          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.p10, BaseStyle.borderGray100, BaseStyle.radius10, BaseStyle.mb10]}>
                            <View>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.mb5]}>Ringkasan Pembelian</Text>
                              <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textSM]}>Rp. 1.600.000</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={openBottomSheet}>
                              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textXS1]}>Detail</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={[BaseStyle.wFull, BaseStyle.p10, BaseStyle.borderGray100, BaseStyle.radius10, BaseStyle.mb10]}>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter,]}>
                            <Image source={LogoBankBCA} style={[BaseStyle.w30, BaseStyle.h30]} />
                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.ml10]}>Bank Central Asia</Text>
                          </View>
                          <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.textLG, BaseStyle.mv10]}>8077 7000 1934 3876 8</Text>
                          <Button text="Copy" color="#696B6B" backgroundColor="#EEEEEE" borderRadius={16} paddingVertical={8} width='100%' onPress={() => navigation.navigate('OrderQrCode', {idTicket: idTicket})} />
                          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('OrderPay', {idTicket: idTicket})}>
                            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.mt10]}>Ganti Metode Pembayaran?</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={[BaseStyle.wFull, BaseStyle.p10, BaseStyle.borderGray100, BaseStyle.radius10]}>
                          <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.mb10]}>Konfirmasi pembayaran Anda?</Text>
                          <Button text="Cek Pembayaran" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('OrderQrCode', {idTicket: idTicket})} />
                        </View>
                      </View>
                    ) : (
                      <View style={[BaseStyle.wFull]}>
                        <View style={[BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                          <IlustrationPending width={140} height={140} />
                          <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textLG, BaseStyle.textCenter, BaseStyle.mb10, BaseStyle.mt20]}>Pesanan GAGAL</Text>
                          <Text style={[BaseStyle.alignItemsLeft, BaseStyle.wFull, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10]}>Ringkasan Pembelian</Text>
                          <View style={[BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100]}>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                              <View style={{width: '40%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nomor Pesanan</Text>
                              </View>
                              <View style={{width: '60%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>123456789</Text>
                              </View>
                              <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                              <View style={{width: '40%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Tanggal Pesanan</Text>
                              </View>
                              <View style={{width: '60%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>11 Februari 2025</Text>
                              </View>
                              <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                              <View style={{width: '40%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Paket</Text>
                              </View>
                              <View style={{width: '60%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>Muslim Life Fest</Text>
                              </View>
                              <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                              <View style={{width: '40%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1]}>Total</Text>
                              </View>
                              <View style={{width: '60%'}}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textRight]}>Rp. 1.600.000</Text>
                              </View>
                            </View>
                          </View>
                          <View style={[BaseStyle.alignItemsCenter, BaseStyle.mt40, BaseStyle.wFull]}>
                            <Button text="Coba bayar lagi" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('OrderPay', {idTicket: idTicket})} />
                          </View>
                        </View>
                      </View>
                    )
                  }
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>

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
          <Animated.View style={[styles.bottomSheet, BaseStyle.relative]}>
            <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheet} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.BgWhite, BaseStyle.index1, ({right: 14, top: -40})]}>
              <IconXMarkBlack width={18} height={18} />
            </TouchableOpacity>
            <View>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textMD, BaseStyle.textCenter, BaseStyle.mb20]}>Detail Pesanan</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.textCenter, BaseStyle.mb10]}>Cek kembali rincian transaksi kamu dibawah ini.</Text>
              <View style={[BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100]}>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                  <View style={{width: '40%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nomor Pesanan</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>123456789</Text>
                  </View>
                  <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                  <View style={{width: '40%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Tanggal Pesanan</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>11 Februari 2025</Text>
                  </View>
                  <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                  <View style={{width: '40%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Paket</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>Muslim Life Fest</Text>
                  </View>
                  <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({height: 1})]} />
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                  <View style={{width: '40%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1]}>Total</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textRight]}>Rp. 1.600.000</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default OrderStatus

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