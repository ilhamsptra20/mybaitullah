import React, { useState, memo } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, Linking } from 'react-native';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import pesananData from '../../hook/pesanan/pesananFetch.js'

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';

// COMPONENT
import { CardOrderHorizontal } from '../../components/index.js';

const initialLayout = { width: Dimensions.get('window').width };

const ApplicationInformation = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  return (
    <View style={[BaseStyle.container, BaseStyle.BgGray10]}>
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
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Informasi Aplikasi</Text>
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
        <View style={[BaseStyle.wrap, ({ flex: 1, paddingTop: headerHeight + 10})]}>
          <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.mb20]}>My Baitullah – Teman Ibadah Sehari-hari</Text>

          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Versi & Info Teknis</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Versi: 2.2.0</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Rilis: 21 Maret 2023</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Terakhir diperbarui: 10 April 2025</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Ukuran: 63 MB</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Kompatibel: Android 7.0+ / iOS 15+</Text>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View>

          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Deskripsi</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>My Baitullah adalah platform digital yang dirancang untuk membantu umat Islam dalam menjalankan ibadah sehari-hari. Di dalamnya terdapat berbagai fitur Islami untuk mendukung kehidupan yang lebih religius dan teratur.</Text>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View>

          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Fitur Unggulan</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Jadwal Sholat Otomatis</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Al-Qur’an Digital + Terjemahan</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Dzikir & Doa Harian</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Arah Kiblat</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Baitullah Event</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>• Tawaf Live</Text>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View>

          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Tentang Pengembang</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>PT. Bangkit Membangun Negeri</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Email: info@baitullah.co.id</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Website: baitullah.co.id</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Nomor Telepon: +62817-007-7070</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Whatsapp: +62853-1111-1010</Text>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View>

          <View style={[BaseStyle.mb10]}>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Privasi & Keamanan</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Data lokasi hanya digunakan untuk jadwal sholat dan tidak dibagikan ke pihak ketiga.</Text>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View>

          {/* <View style={[BaseStyle.mb10]}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.amanahdev.com/muslimapp/privasi')}>
              <Text style={styles.link}>📄 Kebijakan Privasi</Text>
            </TouchableOpacity>
          </View>

          <View style={[BaseStyle.mb10]}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.amanahdev.com/muslimapp/terms')}>
              <Text style={styles.link}>📄 Syarat & Ketentuan</Text>
            </TouchableOpacity>
            <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mt10, ({height: 1})]} />
          </View> */}

          <View>
            <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Statistik Aplikasi</Text>
            {/* <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Total Unduhan: 500.000+</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Rating: ⭐ 4.8 / 5.0</Text> */}
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Kategori: Lifestyle / Religi</Text>
            <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.lh18, BaseStyle.mb5]}>Rating Usia: Semua Umur (SU)</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ApplicationInformation;

const styles = StyleSheet.create({})