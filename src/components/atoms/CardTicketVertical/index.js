import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js';

// ICON
import { IconCardTagDarkGreen } from '../../../assets/index.js'

const CardTicketVertical = ({navigation, thumbnail, date, title, price, widht=170, newTicket=false, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.shadow, ({width: widht})]} onPress={onPress}>
      <View style={BaseStyle.relative}>
        {newTicket && 
          <View source={IconCardTagDarkGreen} style={[BaseStyle.absolute, BaseStyle.w80, BaseStyle.index1, BaseStyle.BgDarkGreen500, ({height: 24, top: 0, left: 0, borderTopLeftRadius: 20, borderBottomRightRadius: 20})]}>
            <Text style={[BaseStyle.absolute, BaseStyle.MaisonDemi, BaseStyle.textXS2, BaseStyle.textWhite, BaseStyle.index2, ({top: 4, left: 20})]}>Terbaru</Text>
          </View>
        }
        <Image source={thumbnail} style={[styles.thumbnail, BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.rectangle, BaseStyle.objectFit]} />
      </View>
      <View style={[BaseStyle.pt10, BaseStyle.pb5, BaseStyle.ph10]}>
        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textXS1, BaseStyle.textBlack, BaseStyle.lh16, BaseStyle.pb5]}>{title}</Text>
        <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textGray300]}>{date}</Text>
      </View>
      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, ({height: 1})]} />
      <View style={[BaseStyle.pt5, BaseStyle.pb10, BaseStyle.ph10, BaseStyle.row, BaseStyle.alignItemsCenter]}>
        <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textLightGreen500, BaseStyle.mr5]}>Mulai</Text>
        <Text style={[BaseStyle.MaisonBold, BaseStyle.textSM, BaseStyle.textLightGreen500]}>Rp. {price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardTicketVertical

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    thumbnail: {
        borderRadius: 20
    },
})