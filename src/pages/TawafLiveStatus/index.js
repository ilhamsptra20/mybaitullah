import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Share, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button } from '../../components/index.js';

// ICON
import { IconCopyGrey, IconShareGrey } from '../../assets/icon'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

const TawafLiveStatus = ({ navigation }) => {
  // AMBIL ID CERITA BAITULLAH
  const route = useRoute();
  const { idTawafChannel, channelName, travelName, imageUser, userName, endDate, time, passCode } = route.params || {};

  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  const [link, setLink] = useState(`https://baitullah.co.id/${channelName}/${travelName}/${userName}`);

  const [text, setText] = useState(`
Maksimalkan momen ibadahmu dengan Tawaf Live Bersama Baitullah! Yuk gabung dan rasakan pengalaman thawaf yang lebih khusyuk dan bermakna.

Nama Channel: ${channelName}
Travel: ${travelName}
Pembicara: ${userName}
Tanggal & waktu: ${endDate} - ${time}
Passcode: ${passCode}

${link}
  `);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow === true ? BaseStyle.navScroll : undefined,
          ({
            paddingTop: (StatusBar.currentHeight || 20) + 10,
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
        <View style={[BaseStyle.alignItemsCenter, ({ width: '80%' })]}>
          <View>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS]}>TAWAF LIVE</Text>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXL1]}>Buat channel lalu siaran</Text>
          </View>
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
      >
        <View style={{ paddingTop: headerHeight * 1.5, paddingHorizontal: 14, backgroundColor: '#2CA44B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
        <View style={[BaseStyle.wrap, BaseStyle.relative, ({ top: headerHeight * -0.4 })]}>
          <View style={[BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p30, BaseStyle.radius10, BaseStyle.mb20]}>
            <View style={[BaseStyle.row, BaseStyle.justifyContentRight, BaseStyle.alignItemsCenter, BaseStyle.mb20, BaseStyle.wFull]}>
              <TouchableOpacity onPress={onShare} activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.borderGray200]}>
                <IconShareGrey width={16} height={16} />
              </TouchableOpacity>
            </View>
            <Image source={imageUser} style={[BaseStyle.w80, BaseStyle.h80, BaseStyle.radius10]} />
            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter, BaseStyle.mb10, BaseStyle.mv10]}>Pembicara: {userName}</Text>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textLG, BaseStyle.textCenter, BaseStyle.mb10]}>Buat Channel BERHASIL</Text>
            <View style={[BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100]}>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                <View style={{ width: '40%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Channel</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{channelName}</Text>
                </View>
                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({ height: 1 })]} />
              </View>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                <View style={{ width: '40%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Travel</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{travelName}</Text>
                </View>
                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({ height: 1 })]} />
              </View>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                <View style={{ width: '40%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Tanggal Berakhir</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{endDate}</Text>
                </View>
                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({ height: 1 })]} />
              </View>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                <View style={{ width: '40%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Jam Berakhir</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{time}</Text>
                </View>
                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt20, ({ height: 1 })]} />
              </View>
              <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                <View style={{ width: '40%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1]}>Passcode</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textRight]}>{passCode}</Text>
                </View>
              </View>
            </View>
            <View style={[BaseStyle.alignItemsCenter, BaseStyle.mt20, BaseStyle.wFull]}>
              <Button text="Lihat Channel" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('MyChannel')} />
              <View style={[BaseStyle.h10]} />
              <Button text="Kembali ke halaman Tawaf Live" color="#33C060" backgroundColor='#FFFFFF' borderColor='#33C060' borderRadius={24} paddingVertical={14} width='100%' onPress={() => navigation.navigate('MainApp', { screen: 'Tawaf Live' })} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TawafLiveStatus

const styles = StyleSheet.create({})