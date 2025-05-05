import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button, DatePickerInput, RadioButton, TextInput } from '../../components/index.js';

// ICON
import {LogoBankBCA, IconCalendarGreen, IconClockGreen, IconLocationGreen, IconQrcodeNonactive, IlustrationPattern5, IconUserLine, IconXMarkWhite, IconBiodataNonactive, IconBayarActive, IconArrowLeftWhite, IconArrowLeftBlack} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import ticketData from '../../hook/ticket/ticketFetch.js'

const OrderPay = ({navigation}) => {
  // AMBIL ID TICKET
  const route = useRoute();
  const {idTicket} = route.params

  // AMBIL METODE PEMBAYARAN
  const [paymentMethod, setPaymentMethod] = useState()

  const width = Dimensions.get('window').width;

  // PACKAGE HEIGHT COMPONENT
  const [ticketComponentHeight, setTicketComponentHeight] = useState(0);

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  // TICKET DATA
  // TICKET DATA
  const {ticket, loadingTicket, errorTicket} = ticketData();
  const selectedTicketId = ticket.find((item) => item.id === idTicket);

  // GENDER
  const [selectedGender, setSelectedGender] = useState(null);
    
  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

        {/* HEADER */}
        <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.BgWhite : BaseStyle.BgTrasnparent, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
                <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.BgTrasnparent]} onPress={() => navigation.goBack()}>
                    {navShadow === true ? (
                        <IconArrowLeftBlack width={20} height={20} />
                      ) : (
                        <IconArrowLeftWhite width={20} height={20} />
                      )
                    }
                </TouchableOpacity>
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
                  <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.mb5, ({width: 24, height: 24, borderRadius: 24})]}>
                    <IconBayarActive width={12} height={12} />
                  </View>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.textCenter]}>STEP 2</Text>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Bayar</Text>
                </View>
                <View style={[BaseStyle.dashedBorderBox, ({width: '20%', borderColor: '#FFFFFF'})]} />
                <View style={[BaseStyle.w70, BaseStyle.alignItemsCenter]}>
                  <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.borderWhite, BaseStyle.mb5, ({width: 24, height: 24, borderRadius: 24})]}>
                    <IconQrcodeNonactive width={14} height={14} />
                  </View>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.textCenter]}>STEP 3</Text>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Pesanan</Text>
                </View>
              </View>
            </View>

            {/* PACKAGE */}
            <View
              style={[BaseStyle.wrap, BaseStyle.alignItemsCenter, ({paddingTop: 0})]}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setTicketComponentHeight(height);
              }}
            >
              <View style={[BaseStyle.relative, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius10, BaseStyle.wFull]}>
                {!loadingTicket ? (
                    <View>
                      {(() => {
                        // SCHEDULE VARIABLE 
                        const firstScheduleDate = selectedTicketId.schedule[0]?.date; // Mengambil tanggal dari schedule pertama
                        const lastScheduleDate = selectedTicketId.schedule[selectedTicketId.schedule.length - 1]?.date; // Mengambil tanggal dari schedule terakhir
                        const firstScheduleTime = selectedTicketId.schedule[0]?.time; // Mengambil waktu dari schedule pertama

                        const firtsTicket = selectedTicketId.priceList[0]?.price; // Mengambil harga ticket pertama

                        const saleEndsDate = selectedTicketId.saleEndsDate;

                        return (
                          <View>
                            <View style={[BaseStyle.row]}>
                              {/* IMAGE DETAIL */}
                              <View style={[BaseStyle.relative, ({width: '25%'})]}>
                                <Image source={selectedTicketId.pictureDetail} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.rectangle, BaseStyle.objectFit, BaseStyle.radius4, BaseStyle.mb10]} />
                                <View style={[BaseStyle.absolute, BaseStyle.BgLightGreen500, BaseStyle.index1, ({width: 6, height: '50%', left: -10, top: '22%', borderTopRightRadius: 6, borderBottomRightRadius: 6})]} />
                              </View>
                              <View style={[BaseStyle.pl5, ({width: '75%'})]}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb5]}>{selectedTicketId.title}</Text>
                                <View>
                                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS]}>Harga Mulai</Text>
                                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS, BaseStyle.mb5]}>{firtsTicket}</Text>
                                </View>
                              </View>
                            </View>
                            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mb10, ({height: 1})]} />
                            <View>
                              <View style={[BaseStyle.row, BaseStyle.mb5]}>
                                  <IconCalendarGreen width={20} height={20} />
                                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5]}>{firstScheduleDate} - {lastScheduleDate}</Text>
                                </View>
                                <View style={[BaseStyle.row, BaseStyle.mb5]}>
                                  <IconClockGreen width={20} height={20} />
                                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5]}>{firstScheduleTime}</Text>
                                </View>
                                <View style={[BaseStyle.row]}>
                                  <IconLocationGreen width={20} height={20} />
                                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5, BaseStyle.pr10]}>{selectedTicketId.location}</Text>
                                </View>
                            </View>
                          </View>
                        )
                      })()}
                    </View>  
                  ) : (
                    <></>
                  )
                }
              </View>
            </View>
          </ImageBackground>

          <View style={{paddingTop: ticketComponentHeight}}>
            {/* USER DATA */}
            <View style={[BaseStyle.wrap, ({paddingTop: 0})]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Data Pemesan</Text>
              <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius10, BaseStyle.wFull]}>
                {!loadingUser ? (
                    <>
                      {user.map((item, y) => {
                        return (
                          <View key={y} style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                            <View style={[BaseStyle.relative, BaseStyle.alignItemsCenter]}>
                              <View style={[BaseStyle.absolute, BaseStyle.BgLightGreen500, BaseStyle.index1, ({width: 6, height: '50%', left: -10, borderTopRightRadius: 6, borderBottomRightRadius: 6})]} />
                              {item.avatar === null || item.avatar === '' || item.avatar === undefined || item.avatar === 0 ? (
                                  <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.d40, BaseStyle.radius40, BaseStyle.radius40, BaseStyle.BgGray100]}>
                                    <IconUserLine width={24} />
                                  </View>
                                ) : (
                                  <View style={[BaseStyle.d40, BaseStyle.radius40, BaseStyle.BgWhite]}>
                                      <Image source={item.avatar} style={[BaseStyle.d40, BaseStyle.radius40]} />
                                  </View>
                                )
                              }
                            </View>
                            <View style={[BaseStyle.ph10, ({width: '91%'})]}>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.mb5]}>{item.userName}</Text>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.mb5]}>{item.email}</Text>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.mb5]}>{item.phone}</Text>
                            </View>
                          </View>
                        )
                      })}
                    </>  
                  ) : (
                    <></>
                  )
                }
              </View>
            </View>

            {/* METODE PEMBAYARAN */}
            <View style={[BaseStyle.wrap]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Metode Pembayaran</Text>
              <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius10, BaseStyle.wFull]}>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Bayar Dengan</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('OrderPaymentMethod', {idTicket: idTicket})}><Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS]}>Pilih</Text></TouchableOpacity>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.BgGray100, BaseStyle.p10, BaseStyle.radius8]}>
                  {/* <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>Pilih metode pembayaran Anda</Text> */}
                  <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <Image source={LogoBankBCA} style={[BaseStyle.w30, BaseStyle.h30, BaseStyle.mr10]} />
                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS]}>BCA Virtual Account</Text>
                  </View>
                  <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.borderLightGreen500]}>
                    <View style={[BaseStyle.w10, BaseStyle.h10, BaseStyle.radius10, BaseStyle.BgLightGreen500]} />
                  </View>
                </View>
              </View>
            </View>

            {/* VOUCHER FORM */}
            <View style={[BaseStyle.wrap]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Promo</Text>
              <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius10, BaseStyle.wFull]}>
                <TextInput lable="Kode Promo" placeholder="Masukan kode promo" />
              </View>
            </View>

            {/* RINCIAN BIAYA */}
            <View style={[BaseStyle.wrap]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Rincian Biaya</Text>
              <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius10, BaseStyle.wFull]}>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Detail Transaksi</Text>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>23 Okotober 2024</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Kode Transaksi</Text>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>123456789</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Biaya Penanganan</Text>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>Rp. 20.000</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Nominal</Text>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>Rp. 299.000x2</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Promo (bersamabaitullah)</Text>
                  <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS]}>-Rp. 10.000</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Total</Text>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS]}>Rp. 588.000</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* CHECKOUT CONTENT */}
        <View style={[BaseStyle.wrap, BaseStyle.shadow]}>
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
            <View style={{width: '50%'}}>
              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mb5]}>Jumlah (0 Ticket)</Text>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM]}>Rp. 0</Text>
            </View>
            <View style={{width: '50%'}}>
              <Button text="Lanjutkan" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={() => navigation.navigate('OrderStatus', {idTicket: idTicket})} />
            </View>
          </View>
        </View>
    </View>
  )
}

export default OrderPay

const styles = StyleSheet.create({})