import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

// COMPONENT
import { HeaderLogin, HeaderNotLogin, Carousel, Button, ButtonSearch, CardTicketVertical, CardTicketHorizontal } from '../../components/index.js'
import LinearGradient from 'react-native-linear-gradient';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import carouselData from '../../hook/carousel/carouselFetch.js'
import ticketData from '../../hook/ticket/ticketFetch.js'
import ticketTerbaruData from '../../hook/ticketTerbaru/ticketTerbaruFetch.js'
import ticketTopData from '../../hook/ticketTop/ticketTopFetch.js'
import ticketPilihanData from '../../hook/ticketPilihan/ticketPilihanFetch.js'
import promoData from '../../hook/promor/promoFetch.js'

// ICON
import { IconArrowLeftWhite, IconDiscount1 } from '../../assets/index.js'
const iconTicketNumber = [
  require('../../assets/icon/icon-one.png'),
  require('../../assets/icon/icon-two.png'),
  require('../../assets/icon/icon-three.png'),
]

const Ticket = ({navigation}) => {
  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);
  
  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  // CAROUSEL DATA
  const {carousel, loadingCarousel, errorCarousel} = carouselData();

  // TICKET DATA
  const {ticket, loadingTicket, errorTicket} = ticketData();
  const {ticketTerbaru, loadingTicketTerbaru, errorTicketTerbaru} = ticketTerbaruData();
  const {ticketTop, loadingTicketTop, errorTicketTop} = ticketTopData();
  const {ticketPilihan, loadingTicketPilihan, errorTicketPilihan} = ticketPilihanData();

  // PROMO DATA
  const {promo, loadingPromo, errorPromo} = promoData();

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, backgroundColor: '#2CA44B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.navigate('MainApp', {screen: 'Home'})}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Baitullah Event</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pt10]}>
          <ButtonSearch text="Cari tiket event lainnya di Baitullah" color="#208D33" backgroundColor="#FFFFFF" borderRadius={10} width='100%' onPress={() => navigation.navigate('TicketList')} />
          {/* <TextInputCeritaBaitullah placeholder="Cari Judul Artikel" placeholderColor="#208D33" icon={IconSearcDarkgreen} width="100%" value={search} onChangeText={text => setSearch(text)} /> */}
          {/* <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.row, BaseStyle.alignItemsCenter, ({widht: '20%'})]}>
            <IconFilterWhite width={24} height={24} />
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textWhite, BaseStyle.textCenter, BaseStyle.mt5, BaseStyle.ml5]}>Filter</Text>
          </TouchableOpacity> */}
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
        {/* CAROUSEL */}
        <View style={[BaseStyle.mb20, ({marginTop: StatusBar.currentHeight + 104})]}>
          <Carousel carousel={carousel} pagination={true} />
        </View>

        {/* EVENT TERBARU */}
        <View>
          <View style={{paddingHorizontal: 14, paddingTop: 10,}}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Event Terbaru</Text>
          </View>
          {!loadingTicketTerbaru ? (
              <FlatList
                data={ticketTerbaru}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 14, paddingTop: 10, paddingBottom: 20}}
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
                renderItem={({item}) => {
                  const firstPrice = item.priceList[0]
                  const firstSchedule = item.schedule[0]
                  return (
                    <CardTicketVertical key={item.id} thumbnail={item.thumbnail} date={firstSchedule.date} title={item.title} price={firstPrice.price} newTicket={true} onPress={() => navigation.navigate('TicketDetail', {idTicket: item.id})} />
                  )
                }}
              />
            ) : (
              <></>
            )
          }
        </View>

        {/* TOP EVENT */}
        <LinearGradient style={BaseStyle.wrap} colors={['#FFFFFF', 'rgba(51, 192, 96, .2)']}>
          <View style={{paddingBottom: 10,}}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Top Event</Text>
          </View>
          <View style={BaseStyle.mb20}>
            {!loadingTicketTop ? (
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                  {ticketTop.map((item, y) => {
                    return (
                      <TouchableOpacity key={y} activeOpacity={0.7} style={[BaseStyle.mb10, ({width: width / 2 - 19})]} onPress={() => navigation.navigate('TicketDetail', {idTicket: item.id})}>
                        <Image source={item.thumbnail} style={[BaseStyle.wFull, BaseStyle.h80, BaseStyle.objectFit, BaseStyle.radius10]} />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ) : (
                <></>
              )
            }
          </View>
        </LinearGradient>

        {/* EVENT PILIHAN */}
        <View>
          <View style={{paddingHorizontal: 14, paddingTop: 30,}}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Event Pilihan</Text>
          </View>
          {!loadingTicketPilihan ? (
              <FlatList
                data={ticketPilihan}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 14, paddingTop: 10, paddingBottom: 20}}
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
                renderItem={({item}) => {
                  const firstPrice = item.priceList[0]
                  const firstSchedule = item.schedule[0]
                  return (
                    <CardTicketVertical key={item.id} thumbnail={item.thumbnail} date={firstSchedule.date} title={item.title} price={firstPrice.price} onPress={() => navigation.navigate('TicketDetail', {idTicket: item.id})} />
                  )
                }}
              />
            ) : (
              <></>
            )
          }
        </View>

        {/* PROMO */}
        <View style={[BaseStyle.pv10]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={0.8} style={{paddingLeft: 14}}>
              <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w100, BaseStyle.rectangle, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radius10, BaseStyle.p10, BaseStyle.mb5]}>
                <Image source={IconDiscount1} style={{width: 50, height: 50}} />
              </View>
              <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.pv5, BaseStyle.radius20, BaseStyle.BgDarkGreen500]}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS2]}>Semua Promo</Text>
              </View>
            </TouchableOpacity>

            {!loadingPromo ? (
                <View style={{flexDirection: 'row', paddingRight: 14}}>
                  {promo.map((item, y) => {
                    return(
                      <TouchableOpacity key={y} activeOpacity={0.8} style={[BaseStyle.ml10]}>
                        <Image source={item.image} style={[BaseStyle.w340, BaseStyle.h130, BaseStyle.radius10]} />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ) : (
                <></>
              )
            }
          </ScrollView>
        </View>

        {/* EVENT LAINNYA */}
        <View style={[BaseStyle.wrap]}>
          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Event Lainnya</Text>
          </View>
          {!loadingTicket ? (
              <>
                {ticket.map((item, y) => {
                  const firstPrice = item.priceList[0]
                  const firstSchedule = item.schedule[0]
                  return(
                    <CardTicketHorizontal key={y} thumbnail={item.thumbnail} date={firstSchedule.date} title={item.title} price={firstPrice.price} onPress={() => navigation.navigate('TicketDetail', {idTicket: item.id})} />
                  )
                })}
              </>
            ) : (
              <></>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Ticket

const styles = StyleSheet.create({})