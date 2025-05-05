import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IconNotificationWhite2, IconUserLine } from '../../../assets'
import BaseStyle from '../../../assets/style/AppStyle.js'
import { getItem } from '../../../utils/localStorage.js'

const HeaderLogin = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getItem('user').then((value) => {
      if (value) {
        console.log("user sebelum di-setState:", value);
        setUserData(value);
      } else {
        navigation.navigate('Login');
      }
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching user:", err);
      setLoading(false);
    });
  }, []);

  return (
    <View style={[BaseStyle.row, BaseStyle.justifyBetween]}>
      <View style={BaseStyle.row}>
        {!loading && (
          <View style={BaseStyle.row}>
            {userData?.profile ? (
              <View style={[BaseStyle.d40, BaseStyle.radius40, BaseStyle.BgWhite]}>
                <Image source={{ uri: userData.profile }} style={[BaseStyle.d40, BaseStyle.radius40]} />
              </View>
            ) : (
              <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.d40, BaseStyle.radius40, BaseStyle.BgGray100]}>
                <IconUserLine width={24} />
              </View>
            )}
            <View style={[BaseStyle.pl5]}>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS, BaseStyle.textWhite]}>Assalamualaikum</Text>
              <Text style={[BaseStyle.MaisonExtend, BaseStyle.textXS, BaseStyle.textWhite]}>{userData?.name}</Text>
            </View>
          </View>
        )}

      </View>
      <View style={[BaseStyle.relative]}>
        <View style={[BaseStyle.absolute, BaseStyle.d10, BaseStyle.radius10, BaseStyle.BgOrange, BaseStyle.index1, { right: 10, top: 10 }]} />
        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius40, BaseStyle.BgDarkGreen500]}>
          <IconNotificationWhite2 width={24} height={24} />
        </View>
      </View>
    </View>
  )
}

export default HeaderLogin

const styles = StyleSheet.create({})