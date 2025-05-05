import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import BaseStyle from '../../../assets/style/AppStyle.js';
import { IconCalendarGrey } from '../../../assets/index.js';

const CardBlogHorizontal = ({navigation, onPress, thumbnail, category, title, writer, releaseDate}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, BaseStyle.relative, BaseStyle.row, BaseStyle.pb10, BaseStyle.mb10]} onPress={onPress}>
      <View>
        <View style={[BaseStyle.absolute, BaseStyle.w80, BaseStyle.h80, BaseStyle.BgOverlay, BaseStyle.radius8, BaseStyle.index1]} />
        <Image source={thumbnail} style={[BaseStyle.w80, BaseStyle.h80, BaseStyle.radius8]} />
      </View>
      <View style={[BaseStyle.pl10, ({width: '77.5%'})]}>
        <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textLightGreen500, BaseStyle.mb5]}>{category}</Text>
        <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh20, BaseStyle.mb5]} numberOfLines={3}>{title}</Text>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
              <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.mr5]}>Penulis</Text>
              <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300]}>{writer}</Text>
          </View>
          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
              <IconCalendarGrey width={12} height={12} />
              <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.ml5]}>{releaseDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardBlogHorizontal

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
})