import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, {useState} from 'react'

// COMPONENT
import { HeaderLogin, HeaderNotLogin, TextInputCeritaBaitullah, TextInputTicket, CardTicketHorizontal } from '../../components/index.js'

// ICON
import { IconSearcDarkgreen, IconArrowLeftWhite, IconSearchWhite } from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import ticketData from '../../hook/ticket/ticketFetch.js'

const TicketList = ({navigation}) => {
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

  // FILTER
  const [searchText, setSearchText] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(ticket);

  // FUNCTION FILTER
  const handleSearch = () => {
    if (searchText === '') {
      setFilteredTickets(ticket);
    } else {
      const filtered = ticket.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTickets(filtered);
    }
  };

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, backgroundColor: '#2CA44B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Baitullah Event</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
        <View style={[BaseStyle.relative, BaseStyle.mt10]}>
          <TextInputTicket placeholder="Cari Event" placeholderColor="#208D33" icon={IconSearcDarkgreen} width="100%" value={searchText} onChangeText={setSearchText} />
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.rectangle, BaseStyle.BgDarkGreen500, ({width: 42, top: 0, right: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12})]} onPress={handleSearch} >
            <IconSearchWhite width={20} height={20} />
          </TouchableOpacity>
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
        {/* EVENT LAINNYA */}
        <View style={{marginTop: StatusBar.currentHeight + 104}}>
          <View style={[BaseStyle.wrap]}>
            <View style={[BaseStyle.mb10]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Event Lainnya</Text>
            </View>
            {!loadingTicket ? (
                <>
                  {(filteredTickets.length > 0 ? filteredTickets : ticket).map((item, y) => {
                    const firstPrice = item.priceList[0]
                    const firstSchedule = item.schedule[0]
                    return(
                      <CardTicketHorizontal key={y} thumbnail={item.thumbnail} date={firstSchedule.date} title={item.title} price={firstPrice.price} onPress={() => navigation.navigate('TicketDetail')} />
                    )
                  })}
                </>
              ) : (
                <></>
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TicketList

const styles = StyleSheet.create({})