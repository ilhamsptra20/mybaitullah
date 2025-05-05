import { StyleSheet, Text, View, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENTS
import {TextInput, TextInputPassword, Button, CheckBox} from '../../components/index.js';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// IMAGE
import { IconArrowLeftWhite, IconCalendarGrey } from '../../assets'

// API
import userData from '../../hook/user/userFetch.js'

const height = Dimensions.get("window");

const OrderTicketStatus = ({navigation}) => {
  const route = useRoute();
  const { idTicket, image, date, title, price, status, qrCode } = route.params || {};

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute, 
          BaseStyle.index1, 
          BaseStyle.wFull, navShadow === true ? 
          BaseStyle.navScroll : undefined,
          ({
            paddingTop: StatusBar.currentHeight + 10, 
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
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Pesanan Saya</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          let offset = e.nativeEvent.contentOffset.y
          if(offset >= 1){
            setNavShadow(true)
          }else{
            setNavShadow(false)
          }
        }}
      >
        <View style={{marginTop: headerHeight}}>
          <View style={[BaseStyle.wrap]}>
            { status === "completed" ? (
              <View style={[BaseStyle.BgLightGreen500, BaseStyle.p10, ({borderTopLeftRadius: 10, borderTopRightRadius: 10})]}>
                <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textWhite]}>Selesai</Text>
              </View>
            ) : status === "notYetPaid" ? (
              <View style={[BaseStyle.BgOrange, BaseStyle.p10, ({borderTopLeftRadius: 10, borderTopRightRadius: 10})]}>
                <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textWhite]}>Belum Dibayar</Text>
              </View>
            ) : status === "canceled" ? (
              <View style={[BaseStyle.BgRed, BaseStyle.p10, ({borderTopLeftRadius: 10, borderTopRightRadius: 10})]}>
                <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textWhite]}>Dibatalkan</Text>
              </View>
            ) : null }
            <View style={[BaseStyle.p10, BaseStyle.BgWhite, BaseStyle.shadow, ({borderBottomLeftRadius: 10, borderBottomRightRadius: 10})]}>
              <View style={[BaseStyle.row]}>
                <View>
                  <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgOverlay, BaseStyle.radius8, BaseStyle.index1]} />
                  <Image source={image} style={[BaseStyle.w50, BaseStyle.h50, BaseStyle.radius8]} />
                </View>
                <View style={[BaseStyle.pl10, ({width: '84%'})]}>
                  <View>
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh16]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                  </View>
                  <View style={[BaseStyle.row, BaseStyle.mt5]}>
                    <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.mr10]}>{price.length} tiket</Text>
                    <View>
                      <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300]}>Total Pesanan:</Text>
                      <Text style={[BaseStyle.textXS2, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Rp. {price}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({height: 1})]} />
              <View>
                <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Dipesan</Text>
                <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <IconCalendarGrey width={10} height={10} />
                    <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.ml5]}>{date}</Text>
                </View>
              </View>
              {status === "notYetPaid" && (
                <>
                  <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv10, ({height: 1})]} />
                  <Button text="Lanjut Bayar" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} onPress={() => navigation.navigate("OrderPay", {idTicket: idTicket})} />
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default OrderTicketStatus

const styles = StyleSheet.create({
  // BOTTOM SHEET
  bottomSheetcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bottomSheetoverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  bottomSheetcloseArea: {
    flex: 1, // Area to detect clicks outside the bottom sheet
  },
  bottomSheet: {
    height: height, // Bottom sheet height (40% of screen)
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1000, // Ensure the sheet stays on top
  },
})