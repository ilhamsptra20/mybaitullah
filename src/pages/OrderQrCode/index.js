import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button, DatePickerInput, RadioButton, SwapContentQrCode, TextInput } from '../../components/index.js';
import QRCode from 'react-native-qrcode-svg';

// ICON
import {IlustrationPattern5, IconCopyGreen, IconDownloadGreen, IconWarningGreen} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import qrCodeData from '../../hook/qrCode/qrCodeFetch.js'

const OrderQrCode = ({navigation}) => {
  // AMBIL ID TICKET
  const route = useRoute();
  const {idTicket} = route.params

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const qrSize = Math.min(width, height) * 0.6;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {qrCode, loadingQrCode, errorQrCode} = qrCodeData();
    
  return (
    <View style={[BaseStyle.container, BaseStyle.relative]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

        {/* HEADER */}
        <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.BgWhite : BaseStyle.BgTrasnparent, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}>
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
            <View style={[BaseStyle.w30, BaseStyle.w30]} />
            <Text style={[BaseStyle.MaisonBold, navShadow === true ? BaseStyle.textBlack : BaseStyle.textWhite, BaseStyle.textXL]}>Tiket</Text>
            <View style={[BaseStyle.w30, BaseStyle.w30]} />
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
          <Image source={IlustrationPattern5} style={[BaseStyle.relative, BaseStyle.wFull, BaseStyle.h180, ({paddingTop: StatusBar.currentHeight, borderBottomLeftRadius: 30, borderBottomRightRadius: 30})]} />

          <View style={[BaseStyle.wrap, BaseStyle.wFull, ({marginTop: height * -0.14})]}>
            <SwapContentQrCode data={qrCode} loadingQrCode={loadingQrCode} />
            <View style={[BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.mt10]}>
              <IconWarningGreen width={16} height={16} />
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textCenter, BaseStyle.ml5]}>Jangan bagikan kode pada siapapun!</Text>
            </View>
          </View>
        </ScrollView>

        {/* CHECKOUT CONTENT */}
        <View style={[BaseStyle.wrap, BaseStyle.shadow]}>
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
            <View style={{width: '50%'}}>
              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textXS1, BaseStyle.mb5]}>Jumlah ({qrCode.length} Ticket)</Text>
            </View>
            <View style={{width: '50%'}}>
              <Button text="Kembali ke Beranda" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={() => navigation.navigate('MainApp', {screen: 'Home'})} />
            </View>
          </View>
        </View>
    </View>
  )
}

export default OrderQrCode

const styles = StyleSheet.create({})