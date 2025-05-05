import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import BaseStyle from '../../../assets/style/AppStyle.js';
import { IconCalendarWhite } from '../../../assets/index.js';

const CardBlogHighlight = ({navigation, onPress, thumbnail, category, title, writer, releaseDate}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.relative ,BaseStyle.BgWhite, BaseStyle.radius10, BaseStyle.w260, BaseStyle.h320]} onPress={onPress}>
        <View style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w260, BaseStyle.h320, BaseStyle.BgOverlay, BaseStyle.radius10, BaseStyle.index1]} />
        <ImageBackground source={thumbnail} imageStyle={{width: '100%', height: 320, objectFit: 'cover', borderRadius: 10}}>
            <View style={[BaseStyle.p10, BaseStyle.index2, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.column, BaseStyle.justifyContentRight]}>
                <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textWhite, BaseStyle.mb10]}>{category}</Text>
                <Text style={[BaseStyle.textMD, BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.lh20, BaseStyle.mb10]} numberOfLines={3}>{title}</Text>
                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                    <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                        <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.mr5]}>Penulis</Text>
                        <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textWhite]}>{writer}</Text>
                    </View>
                    <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                        <IconCalendarWhite width={12} height={12} />
                        <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textWhite, BaseStyle.ml5]}>{releaseDate}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default CardBlogHighlight

const styles = StyleSheet.create({})