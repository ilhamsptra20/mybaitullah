import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native'
import React from 'react'

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'
import { IconCalendarGrey, IconCardTagDarkGreen } from '../../../assets/index.js'

const CardBlogVertical = ({thumbnail, category, title, writer, releaseDate, onPress, newBlog=true, widht=170}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[{width: widht}]} onPress={onPress}>
      <View style={[BaseStyle.relative]}>
        {newBlog && 
          <View source={IconCardTagDarkGreen} style={[BaseStyle.absolute, BaseStyle.w60, BaseStyle.index1, BaseStyle.BgDarkGreen500, ({height: 19, top: 0, left: 0, borderTopLeftRadius: 6, borderBottomRightRadius: 6})]}>
            <Text style={[BaseStyle.absolute, BaseStyle.MaisonDemi, BaseStyle.textXS2, BaseStyle.textWhite, BaseStyle.index2, ({top: 2, left: 10})]}>Terbaru</Text>
          </View>
        }
        <Image source={thumbnail} style={[BaseStyle.wFull, BaseStyle.h100, BaseStyle.objectFit, BaseStyle.radius6]} />
      </View>
      <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textDarkGreen500, BaseStyle.pv5]}>{category}</Text>
      <Text style={[BaseStyle.MaisonBold, BaseStyle.textXS, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.pb5]}>{title}</Text>
      <View style={[BaseStyle.row, BaseStyle.itemsCenter, BaseStyle.pb5]}>
        <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textGray300, BaseStyle.mr5]}>Penulis</Text>
        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textXS1, BaseStyle.textGray300]}>{writer}</Text>
      </View>
      <View style={[BaseStyle.relative, BaseStyle.row, BaseStyle.itemsCenter]}>
        <IconCalendarGrey widht={12} height={12} style={[BaseStyle.absolute, ({left: -6, top: 2})]} />
        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textXS1, BaseStyle.textGray300, BaseStyle.ml15]}>{releaseDate}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardBlogVertical

const styles = StyleSheet.create({})