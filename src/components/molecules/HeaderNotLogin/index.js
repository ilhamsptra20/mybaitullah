import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LogoBaitullah } from '../../../assets/logo'
import { Button } from '../../atoms'
import BaseStyle from '../../../assets/style/AppStyle.js'
import { IconLoginWhite, IconUserLine } from '../../../assets'

const HeaderNotLogin = ({ navigation }) => {
  return (
    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.itemsCenter]}>
      <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.d40, BaseStyle.radius40, BaseStyle.radius40, BaseStyle.BgWhite]}>
          <IconUserLine width={24} />
        </View>
        <Text style={[BaseStyle.pl5, BaseStyle.MaisonBook, BaseStyle.textXS, BaseStyle.textWhite]}>Assalamualaikum</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SignIn')}>
        <IconLoginWhite width={28} height={28} />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderNotLogin

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 26,
    height: 32,
  },
})