import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { HeaderLogin, HeaderNotLogin, TextInputCeritaBaitullah, CardTawafLiveHorizontal } from '../../components/index.js'

// ICON
import { IconArrowLeftWhite, IconSearcDarkgreen, IconSearchWhite } from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import tawafChannelData from '../../hook/tawafChannel/tawafChannelFetch.js'
import useTawafChannelSearch from '../../hook/useTawafChannelSearch.js';

const TawafLiveList = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const { user, loadingUser, errorUser } = userData();

  // FILTER
  const [searchText, setSearchText] = useState('');

  // TAWAF CHANNEL DATA
  const { tawafChannel, loadingTawafChannel, errorTawafChannel } = useTawafChannelSearch(searchText);

  const [filteredTawafChannel, setFilteredTawafChannel] = useState(tawafChannel);


  // FUNCTION FILTER
  const handleSearch = () => {
    if (searchText === '') {
      setFilteredTawafChannel(tawafChannel);
    } else {
      const filtered = tawafChannel.filter((tawafChannel) =>
        tawafChannel.channelName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTawafChannel(filtered);
    }
  };

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.navScroll : undefined, ({ paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, backgroundColor: '#2CA44B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 })]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Tawaf Live</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
        <View style={[BaseStyle.relative, BaseStyle.mt10]}>
          <TextInputCeritaBaitullah placeholder="Cari Channel Tawaf Live Lainnya" placeholderColor="#208D33" icon={IconSearcDarkgreen} width="100%" value={searchText} onChangeText={setSearchText} />
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.rectangle, BaseStyle.BgDarkGreen500, ({ width: 42, top: 0, right: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12 })]} onPress={handleSearch} >
            <IconSearchWhite width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

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
        {/* CERITA LAINNYA */}
        <View style={{ marginTop: StatusBar.currentHeight + 104 }}>
          <View style={[BaseStyle.wrap]}>
            <View style={[BaseStyle.mb10]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Tawaf Live Lainnya</Text>
            </View>
            {!loadingTawafChannel ? (
              <>
                {(filteredTawafChannel.length > 0 ? filteredTawafChannel : tawafChannel).map((item, y) => {
                  const periodDate = item.period.date
                  const periodTime = item.period.time
                  return (
                    <CardTawafLiveHorizontal key={y} image={item.image} channelName={item.channelName} hostName={item.hostName} travelName={item.travelName} periodDate={periodDate} periodTime={periodTime} passCode={item.passCode} myChannel={false} onPress={() => navigation.navigate('TawafRoom', { idRoom: item.id, role: role })} />
                  )
                })}
              </>
            ) : (
              <View>
                <View style={[BaseStyle.alignItemsCenter, BaseStyle.borderGray100, BaseStyle.radius10, BaseStyle.p10]}>
                  {/* <Image source={IlustrationEmptyContent02} style={[BaseStyle.wFull, BaseStyle.h200, BaseStyle.rectangle]} /> */}
                  <View style={[BaseStyle.mv20]}>
                    <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter]}>Loading...</Text>
                  </View>
                </View>
              </View>
            )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TawafLiveList

const styles = StyleSheet.create({})