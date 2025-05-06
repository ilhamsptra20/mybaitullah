import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { formatDate } from '../../utils/formatDate.js';

// COMPONENT
import { TextInputCeritaBaitullah, CardTawafLiveHorizontal } from '../../components/index.js'

// ICON
import { IconArrowLeftWhite, IconSearcDarkgreen, IconSearchWhite } from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import myTawafChannelData from '../../hook/myTawafChannel/myTawafChannelFetch.js'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import { getItem } from '../../utils/localStorage.js';

const MyWalkieTalkie = ({ navigation, route }) => {
  const width = Dimensions.get('window').width;

  // const { role } = route.params; // role = "host" atau "audience"
  const [role, setRole] = useState("");

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const { user, loadingUser, errorUser } = userData();

  // MY TAWAF CHANNEL DATA
  const { myTawafChannel, loadingMyTawafChannel, errorMyTawafChannel } = myTawafChannelData();

  // FILTER
  const [searchText, setSearchText] = useState('');
  const [filteredMyTawafChannel, setFilteredMyTawafChannel] = useState(myTawafChannel);

  // FUNCTION FILTER
  const handleSearch = () => {
    if (searchText === '') {
      setFilteredMyTawafChannel(myTawafChannel);
    } else {
      const filtered = myTawafChannel.filter((myTawafChannel) =>
        myTawafChannel.channelName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMyTawafChannel(filtered);
    }
  };

  // get role
  useEffect(() => {
    getItem('user').then((res) => {
      if (res) {
        if (res.is_ustadz) {
          setRole('host');
        } else {
          setRole('audience');
        }
      } else {
        navigation.replace('Login');
      }
    })
  }, []);
  useEffect(() => {
    if (!loadingMyTawafChannel) {
      console.log("myTawafChannel", myTawafChannel);
    }
  }
    , [myTawafChannel]);

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
          {/* <TextInputCeritaBaitullah placeholder="Cari Nama Channel" placeholderColor="#208D33" icon={IconSearcDarkgreen} width="100%" value={searchText} onChangeText={setSearchText} />
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.rectangle, BaseStyle.BgDarkGreen500, ({ width: 42, top: 0, right: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12 })]} onPress={handleSearch} >
            <IconSearchWhite width={20} height={20} />
          </TouchableOpacity> */}
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
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Channel Saya</Text>
            </View>
            {myTawafChannel &&
              !loadingMyTawafChannel ? (
              <>
                {(filteredMyTawafChannel.length > 0 ? filteredMyTawafChannel : myTawafChannel).map((item, y) => {
                  const periodDate = item.period.date
                  const periodTime = item.period.time
                  return (
                    <CardTawafLiveHorizontal key={y} image={item.image} channelName={item.channelName} hostName={item.hostName} travelName={item.travelName} periodDate={formatDate(periodDate)} periodTime={periodTime} passCode={item.passCode} myChannel={true} share={true} onPress={() => navigation.navigate('TawafRoom', { idRoom: item.id, role: role, channelName: item.channelName, travelName: item.travelName, imageUser: item.image, hostName: item.hostName, periodDate: periodDate, periodTime: periodTime, channelCode: item.channelCode })} />
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

export default MyWalkieTalkie

const styles = StyleSheet.create({})