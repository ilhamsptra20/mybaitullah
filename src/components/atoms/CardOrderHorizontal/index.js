import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import BaseStyle from '../../../assets/style/AppStyle.js';
import { IconCalendarGrey } from '../../../assets/index.js';
import Button from '../Button/index.js';

const CardOrderHorizontal = ({navigation, image, date, title, price, qrCode, status, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radius10, BaseStyle.relative, BaseStyle.p10]} onPress={onPress}>
      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
        <View>
          <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Dipesan</Text>
          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
              <IconCalendarGrey width={10} height={10} />
              <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.ml5]}>{date}</Text>
          </View>
        </View>
        {status === "active" ? (
          <View style={[BaseStyle.BgLightGreen200, BaseStyle.ph10, BaseStyle.pv5, BaseStyle.radius4]}>
            <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textLightGreen500]}>Sedang Berlangsung</Text>
          </View>
        ) : status === "completed" ? (
          <View style={[BaseStyle.BgLightGreen200, BaseStyle.ph10, BaseStyle.pv5, BaseStyle.radius4]}>
            <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textLightGreen500]}>Selesai</Text>
          </View>
        ) : status === "notYetPaid" ? (
          <View style={[BaseStyle.BgLightOrange, BaseStyle.ph10, BaseStyle.pv5, BaseStyle.radius4]}>
            <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textOrange]}>Belum Dibayar</Text>
          </View>
        ) : status === "canceled" ? (
          <View style={[BaseStyle.BgLightRed, BaseStyle.ph10, BaseStyle.pv5, BaseStyle.radius4]}>
            <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textRed]}>Dibatalkan</Text>
          </View>
        ) : null}
      </View>
      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({height: 1})]} />
      <View style={[BaseStyle.row]}>
        <View>
          <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgOverlay, BaseStyle.radius8, BaseStyle.index1]} />
          <Image source={image} style={[BaseStyle.w50, BaseStyle.h50, BaseStyle.radius8]} />
        </View>
        <View style={[BaseStyle.pl10, ({width: '84%'})]}>
          <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh16]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300]}>{price.length} tiket</Text>
        </View>
      </View>
      <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({height: 1})]} />
      <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
        <View>
          <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300]}>Total Pesanan:</Text>
          <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Rp. {price}</Text>
        </View>
        <Button text="Lihat Detail" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} />
      </View>
    </TouchableOpacity>
  )
}

export default CardOrderHorizontal

const styles = StyleSheet.create({})