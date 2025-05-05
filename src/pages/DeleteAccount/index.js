import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Share, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
// ICON
import {IconArrowLeftWhite} from '../../assets/icon'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'
import { Button } from '../../components/index.js';

const data = [
  'Setelah akun dihapus, kamu tidak dapat log in kembali dan melihat riwayat akun. Akun yang telah dihapus tidak dapat dikembalikan.',
  'Penghapusan akun tidak dapat dilakukan jika kamu memiliki pesanan atau hal lain yang belum selesai, termasuk urusan hukum.',
  'Setelah akunmu dihapus, MyBaitullah mungkin masih menyimpan data tertentu sesuai dengan Kebijakan Privasi MyBaitullah dan peraturan yang berlaku.',
  'MyBaitullah berhak untuk menolak permintaan pembuatan akun baru olehmu di kemudian hari.',
  'Penghapusan akun tidak membebaskanmu dari kewajiban dan/atau tanggun jawab yang masih berjalan.'
]

const DeleteAccount = ({navigation}) => {
  const width = Dimensions.get('window').width;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow === true ? BaseStyle.navScroll : undefined,
          ({
            paddingTop: (StatusBar.currentHeight || 20) + 10,
            paddingHorizontal: 14,
            paddingBottom: 10,
            backgroundColor: '#2CA44B',
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6})
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderHeight(height);
          }}
      >
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Hapus Akun</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      {/* Konten ScrollView */}
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
        <View style={{paddingTop: headerHeight + 10}}>
          <View style={[BaseStyle.wrap]}>
            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.lh18, BaseStyle.mb10]}>Dengan klik 'Melanjutkan' , kamu setuju bahwa:</Text>
            {data.map((item, index) => (
              <View key={index} style={[BaseStyle.row, BaseStyle.alignItemsLeft, BaseStyle.mb5]}>
                <Text style={{ fontSize: 16, lineHeight: 22 }}>{'\u2022'}</Text>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh18, BaseStyle.pl10, ({flex: 1})]}>{item}</Text>
              </View>
            ))}
            <Button text="Lanjutkan" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DeleteAccount

const styles = StyleSheet.create({})