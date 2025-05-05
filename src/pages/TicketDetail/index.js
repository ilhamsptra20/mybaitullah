import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button } from '../../components/index.js';

// ICON
import {IconCalendarGreen, IconCalendarTag, IconArrowLeftWhite, IconClockGreen, IconLocationGreen, IconMinusWhite, IconPlusWhite, IlustrationContainerTicket, IconArrowLeftBlack} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import ticketData from '../../hook/ticket/ticketFetch.js'

const TicketDetail = ({navigation}) => {
  // AMBIL ID TICKET
  const route = useRoute();
  const {idTicket} = route.params

  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  // TICKET DATA
  const {ticket, loadingTicket, errorTicket} = ticketData();
  const selectedTicketId = ticket.find((item) => item.id === idTicket);

  // INCREMENT DECREMENT TICKET
  const [ticketCount, setTicketCount] = useState(0);

  const incrementTicket = () => {
    if (ticketCount < 4) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementTicket = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  // Animasi untuk zoom image
  const scrollY = new Animated.Value(0);

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.BgWhite : BaseStyle.BgTrasnparent, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30]} onPress={() => navigation.goBack()}>
            {navShadow === true ? (
                <IconArrowLeftBlack width={20} height={20} />
              ) : (
                <IconArrowLeftWhite width={20} height={20} />
              )
            }
          </TouchableOpacity>
          {/* <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL]}>Detail</Text> */}
          <View style={[BaseStyle.w30, BaseStyle.w30]} />
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
        <View>
          {!loadingTicket ? (
              <View>
                {(() => {
                  // SCHEDULE VARIABLE 
                  const firstScheduleDate = selectedTicketId.schedule[0]?.date; // Mengambil tanggal dari schedule pertama
                  const lastScheduleDate = selectedTicketId.schedule[selectedTicketId.schedule.length - 1]?.date; // Mengambil tanggal dari schedule terakhir
                  const firstScheduleTime = selectedTicketId.schedule[0]?.time; // Mengambil waktu dari schedule pertama

                  const ticket = selectedTicketId.priceList;

                  const saleEndsDate = selectedTicketId.saleEndsDate;
            
                  return (
                    <>
                      {/* IMAGE DETAIL */}
                      <Animated.Image
                        source={selectedTicketId.pictureDetail}
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
            
                      <View style={[BaseStyle.relative, BaseStyle.BgWhite, ({paddingTop: 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: -30, zIndex: 1})]}>
                        {/* DETAIL */}
                        <View style={[BaseStyle.wrap]}>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsLeft, BaseStyle.dashedBorderBox, BaseStyle.pb10]}>
                            <View style={{width: '80%'}}>
                              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>{selectedTicketId.title}</Text>
                              <View style={[BaseStyle.row, BaseStyle.mb5]}>
                                <IconCalendarGreen width={20} height={20} />
                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5]}>{firstScheduleDate} - {lastScheduleDate}</Text>
                              </View>
                              <View style={[BaseStyle.row, BaseStyle.mb5]}>
                                <IconClockGreen width={20} height={20} />
                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5]}>{firstScheduleTime}</Text>
                              </View>
                              <View style={[BaseStyle.row, BaseStyle.mb5]}>
                                <IconLocationGreen width={20} height={20} />
                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml5, BaseStyle.pr10]}>{selectedTicketId.location}</Text>
                              </View>
                            </View>
                            <View style={{width: '20%'}}>
                              <View style={[BaseStyle.relative, BaseStyle.wFull, BaseStyle.hAuto]}>
                                <IconCalendarTag width='100%' />
                                <View style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.hAuto, ({top: '60%'})]}>
                                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS, BaseStyle.textCenter]}>Hari</Text>
                                </View>
                                <View style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.hAuto, ({top: '24%'})]}>
                                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textSM, BaseStyle.textCenter]}>{selectedTicketId.day}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
              
                        {/* ORGANIZER */}
                        <View style={[BaseStyle.wrap]}>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Diselenggarakan Oleh</Text>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.radiusCircle, BaseStyle.BgWhite, BaseStyle.borderGray100, BaseStyle.p5]}>
                              <Image source={selectedTicketId.organizerLogo} style={[BaseStyle.w40, BaseStyle.h40, BaseStyle.objectFit, BaseStyle.radius40]} />
                            </View>
                            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.ml10]}>{selectedTicketId.organizer}</Text>
                          </View>
                        </View>

                        <View style={[BaseStyle.wFull, BaseStyle.h10, ({backgroundColor: '#F5F7FA'})]} />

                        {/* TICKET */}
                        <View style={[BaseStyle.wrap]}>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Pilih Tiket</Text>
                          <View style={[BaseStyle.wFull]}>
                            {ticket.map((item, y) => {
                              return(
                                <View key={y} style={[BaseStyle.relative, BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.radius10, BaseStyle.wFull, BaseStyle.h200]} onPress={() => ticketHandlePress(item.id, item.ticketName, item.price)}>
                                  <Image source={IlustrationContainerTicket} style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape, BaseStyle.index1]} resizeMode='contain' />
                                  <View style={[BaseStyle.justifyCenter, BaseStyle.absolute, BaseStyle.wFull, BaseStyle.index1, BaseStyle.p15, ({height: '62%'})]}>
                                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb5]}>{item.ticketName}</Text>
                                    <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.fItalic, BaseStyle.mb5]}>Harga sudah termasuk pajak dan tidak termasuk biaya platform</Text>
                                    {saleEndsDate.map((item, y) => {
                                      return (
                                        <View key={y} style={[BaseStyle.row]}>
                                          <IconClockGreen width={20} height={20} />
                                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.ml5]}>
                                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS1]}>Penjualan berakhir pada {item.date}</Text>
                                            <View style={[BaseStyle.BgDarkGreen500, BaseStyle.mh5, ({width: 6, height: 6, borderRadius: 6})]} />
                                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS1]}>{item.time} WIB</Text>
                                          </View>
                                        </View>
                                      )
                                    })}
                                  </View>
                                  <View style={[BaseStyle.justifyCenter, BaseStyle.absolute, BaseStyle.wFull, BaseStyle.index1, BaseStyle.p15, ({bottom: 0, height: '38%'})]}>
                                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                                      <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textSM]}>Rp. {item.price}</Text>
                                      <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                                        <TouchableOpacity onPress={decrementTicket} activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.BgGray200, BaseStyle.mr10]}>
                                          <IconMinusWhite width={16} height={16} />
                                        </TouchableOpacity>
                                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.borderGray200]}>
                                          <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textSM]}>{ticketCount}</Text>
                                        </View>
                                        <TouchableOpacity onPress={incrementTicket} activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.BgGray300, BaseStyle.ml10]}>
                                          <IconPlusWhite width={16} height={16} />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              )
                            })}
                          </View>
                        </View>

                        <View style={[BaseStyle.wFull, BaseStyle.h10, ({backgroundColor: '#F5F7FA'})]} />

                        {/* DESCRIPTION */}
                        <View style={[BaseStyle.wrap]}>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Deskripsi</Text>
                          <View style={[BaseStyle.wFull]}>
                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh20, BaseStyle.textJustify]}>{selectedTicketId.description}</Text>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })()}
              </View>
            ) : (
              <></>
            )
          }
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
            <Button text="Pesan Sekarang" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={() => navigation.navigate('OrderBiodata', {idTicket: idTicket})} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default TicketDetail

const styles = StyleSheet.create({})