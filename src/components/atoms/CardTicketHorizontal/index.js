import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import BaseStyle from '../../../assets/style/AppStyle.js';
import { IconCalendarGrey } from '../../../assets/index.js';

const CardTicketHorizontal = ({navigation, thumbnail, date, title, price, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, BaseStyle.relative, BaseStyle.row, BaseStyle.pb10, BaseStyle.mb10]} onPress={onPress}>
      <View>
        <View style={[BaseStyle.absolute, BaseStyle.w80, BaseStyle.h80, BaseStyle.BgOverlay, BaseStyle.radius8, BaseStyle.index1]} />
        <Image source={thumbnail} style={[BaseStyle.w80, BaseStyle.h80, BaseStyle.radius8]} />
      </View>
      <View style={[BaseStyle.pl10, ({width: '77.5%'})]}>
        <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh20, BaseStyle.mb5]} numberOfLines={3}>{title}</Text>
        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
            <IconCalendarGrey width={12} height={12} />
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.ml5]}>{date}</Text>
        </View>
        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mt5]}>
          <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textLightGreen500, BaseStyle.mr5]}>Mulai</Text>
          <Text style={[BaseStyle.textMD, BaseStyle.MaisonBold, BaseStyle.textLightGreen500]}>Rp. {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardTicketHorizontal

const styles = StyleSheet.create({
  // container: {
  //   borderBottomWidth: 1,
  //   borderColor: '#F0F0F0',
  // },
})