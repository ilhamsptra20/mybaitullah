import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';

// COMPONENT
import { HeaderLogin, HeaderNotLogin, ButtonSearch, Button, CardTawafLiveHorizontal, AudienceTawaf, HostTawaf } from '../../components/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import tawafChannelData from '../../hook/tawafChannel/tawafChannelFetch.js'
import myTawafChannelData from '../../hook/myTawafChannel/myTawafChannelFetch.js'

// ASSETS
import { IlustrationBannerTawaf, IlustrationEmptyContent02 } from '../../assets';
import { getItem } from '../../utils/localStorage.js';

const Tawaf = ({ navigation }) => {
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
  let [status, setStatus] = useState(0);

  // USER DATA
  const { user, loadingUser, errorUser } = userData();
  const [participant, setParticipant] = useState("host"); // host atau audience

  // TAWAF CHANNEL DATA
  const { tawafChannel, loadingTawafChannel, errorTawafChannel } = tawafChannelData();

  // MY TAWAF CHANNEL DATA
  const { myTawafChannel, loadingMyTawafChannel, errorMyTawafChannel } = myTawafChannelData();

  useEffect(() => {
    getItem('user').then((res) => {
      if (res) {
        console.log(res.is_ustadz);
        if (res.is_ustadz) {
          setParticipant("host");
        } else {
          setParticipant("audience");
        }
      } else {
        navigation.replace('SignIn');
      }

    });
  }, []);

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

      {participant === "host" ? (
        <HostTawaf navigation={navigation} role={participant} />
      ) : (
        <AudienceTawaf navigation={navigation} role={participant} />
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({});

export default Tawaf;
