import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { formatDate } from '../../../utils/formatDate.js';

// COMPONENT
import HeaderLogin from '../HeaderLogin';
import HeaderNotLogin from '../HeaderNotLogin';
import { ButtonSearch, Button, CardTawafLiveHorizontal } from '../../atoms';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js';

// API
import userData from '../../../hook/user/userFetch.js'
import tawafChannelData from '../../../hook/tawafChannel/tawafChannelFetch.js'
import myTawafChannelData from '../../../hook/myTawafChannel/myTawafChannelFetch.js'
import tawafJoinChannelData from '../../../hook/tawafJoinChannel/tawafJoinChannelFetch.js'

// ASSETS
import { IlustrationBannerTawaf, IlustrationEmptyContent02 } from '../../../assets';
import { getItem } from '../../../utils/localStorage.js';

import useTawafChannelOnline from '../../../hook/useTawafChannelOnline.js';

const AudienceTawaf = ({ navigation, role }) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get("window");

  // SKELETON WIDTH
  const cardWidth = Dimensions.get('window').width * 1;
  const skeWidth = cardWidth - 32;

  // NAVBACKGROUND
  const [nav, setNav] = useState(false)

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  // const { user, loadingUser, errorUser } = userData();
  let imageUser = null;
  let userName = null;
  // if (!loadingUser) {
  //   imageUser = user[0].avatar;
  //   userName = user[0].userName;
  // }

  const [userData, setUserData] = useState(null);

  // TAWAF CHANNEL DATA
  const { tawafChannel, loadingTawafChannel, errorTawafChannel, refetch } = tawafChannelData();


  // MY TAWAF CHANNEL DATA
  const { myTawafChannel, loadingMyTawafChannel, errorMyTawafChannel } = myTawafChannelData();

  // JOIN TAWAF CHANNEL DATA
  const { tawafJoinChannel, loadingTawafJoinChannel, errorTawafJoinChannel } = tawafJoinChannelData();

  // channel online
  const { tawafChannelOnline, loadingTawafChannelOnline, errorTawafChannelOnline, refetchChannelOnline } = useTawafChannelOnline();

  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // panggil fungsi dari hook
    await refetchChannelOnline();

    setRefreshing(false);
  };

  useEffect(() => {
    if (!loadingTawafChannel) {
      console.log("tawafChannel", tawafChannel);
    }
    getItem('user').then((value) => {
      if (value) {
        console.log("user sebelum di-setState:", value);
        setUserData(value);
      } else {
        navigation.navigate('Login');
      }
    }).catch((err) => {
      console.error("Error fetching user:", err);
    });
  }, []);

  return (
    <View style={[BaseStyle.container]}>
      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow === true ? BaseStyle.navScroll : undefined,
          ({
            paddingTop: StatusBar.currentHeight + 10,
            paddingHorizontal: 14,
            paddingBottom: 10,
            backgroundColor: '#2CA44B',
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6
          })
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
      >
        {status === 1 ? (
          <HeaderLogin avatar={userData?.avatar || null} userName={userData?.name || "Guest"} />
        ) : (
          <HeaderNotLogin navigation={navigation} />
        )
        }
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pt10]}>
          <ButtonSearch text="Cari Channel" color="#208D33" backgroundColor="#FFFFFF" borderRadius={10} width='100%' onPress={() => navigation.navigate('TawafLiveList')} />
        </View>
      </View>

      {/* Konten ScrollView */}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* BANNER */}
        <View style={{ paddingTop: headerHeight - 10, paddingBottom: bannerHeight * 0.4, paddingHorizontal: 14, backgroundColor: '#2CA44B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
        <View style={[BaseStyle.wrap, BaseStyle.relative, ({ top: bannerHeight * -0.3 })]}>
          <View
            style={[
              BaseStyle.relative,
              BaseStyle.wFull,
              BaseStyle.hAuto,
              BaseStyle.banner,
              BaseStyle.BgWhite,
              BaseStyle.shadow,
              BaseStyle.index2,
              BaseStyle.radius10,
            ]}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setBannerHeight(height);
            }}
          >
            <Image source={IlustrationBannerTawaf} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.banner, BaseStyle.radius10]} />
            <View style={[BaseStyle.absolute, BaseStyle.hFull, BaseStyle.index1, BaseStyle.p20, BaseStyle.BgTrasnparent, ({ width: '56%' })]}>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.mb10]}>Baitullah Tawaf Live</Text>
              <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18]}>Dengarkan siaran langsung tawaf live dengan MyBaitullah</Text>
            </View>
          </View>
        </View>

        <View style={[BaseStyle.relative, ({ top: -20 })]}>
          {/* TAWAF LIST */}
          <View style={[BaseStyle.wrap, BaseStyle.mb70,]}>
            {/* Tawaf Channel online */}
            {tawafChannelOnline ? (
              <>
                <View style={BaseStyle.mb10}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Channel yang sedang berlangsung</Text>
                </View>
                {!loadingTawafChannelOnline ? (
                  <>
                    {tawafChannelOnline.length > 0 && (
                      <>
                        {tawafChannelOnline.map((item, y) => {
                          const periodDate = item.period.date
                          const periodTime = item.period.time
                          return (
                            <CardTawafLiveHorizontal key={y} image={item.image} channelName={item.channelName} hostName={item.hostName} travelName={item.travelName} periodDate={formatDate(periodDate)} periodTime={periodTime} passCode={item.passCode} myChannel={false} onPress={() => navigation.navigate('TawafRoom', { idRoom: item.id, role: role, passCodeNumber: item.passCode, periodDate, periodTime, hostName: item.hostName, channelName: item.channelName, channelCode: item.channelCode, isOnline: true })} />
                          )
                        }
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

              </>
            ) : (
              <>
                <View style={BaseStyle.mb10}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Channel yang Tersedia</Text>
                </View>

                {/* TAWAF CHANNEL */}
                {!loadingTawafChannel ? (
                  <>
                    {tawafChannel.length > 0 ? (
                      <>
                        {tawafChannel.map((item, y) => {
                          const periodDate = item.period.date
                          const periodTime = item.period.time
                          return (
                            <CardTawafLiveHorizontal key={y} image={item.image} channelName={item.channelName} hostName={item.hostName} travelName={item.travelName} periodDate={formatDate(periodDate)} periodTime={periodTime} passCode={item.passCode} myChannel={false} onPress={() => navigation.navigate('TawafLiveJoin', { idRoom: item.id, role: role, passCodeNumber: item.passCode, periodDate, periodTime, hostName: item.hostName, channelName: item.channelName, channelCode: item.channelCode })} />
                          )
                        })}
                      </>
                    ) : (
                      <View style={[BaseStyle.alignItemsCenter, BaseStyle.borderGray100, BaseStyle.radius10, BaseStyle.p10]}>
                        <Image source={IlustrationEmptyContent02} style={[BaseStyle.wFull, BaseStyle.h200, BaseStyle.rectangle]} />
                        <View style={[BaseStyle.mv20]}>
                          <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter]}>Tidak ada channel</Text>
                          <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter]}>Saat ini belum ada channel</Text>
                        </View>
                      </View>
                    )
                    }
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
              </>
            )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AudienceTawaf

const styles = StyleSheet.create({})