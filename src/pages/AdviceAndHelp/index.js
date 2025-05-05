import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, Share, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
// ICON
import {IconArrowLeftWhite, IconCaretRightGreen, IconCartCheckGreen, IconCartGreen, IconCartOffGreen, IconFlagGreen, IconMailGreen, IconPaymentGreen, IconPhoneGreen, IconUserGreen, IconWhatsappGreen} from '../../assets/icon'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'
import { IlustrationDaftarAkun1, IlustrationDaftarAkun2, IlustrationDaftarAkun3, IlustrationDaftarAkun4, IlustrationDaftarAkun5, IlustrationHapusAkun1, IlustrationMetodePembayaran1, IlustrationMetodePembayaran2, IlustrationMetodePembayaran3, IlustrationPesanan1, IlustrationSetelahMelakukanPemesanan1, IlustrationSetelahMelakukanPemesanan2 } from '../../assets/index.js';

const data = [
  {
    id: 1,
    title: 'Membuat Akun',
    icon: <IconFlagGreen width={24} height={24} />,
    text: 'Sebelum Anda membuat akun, baca Ketentuan Layanan dan Kebijakan Privasi MyBaitullah.\n \nSebelum Anda membuat akun, pastikan Anda sudah memiliki email yang aktif dan nomor telepon yang dapat dihubungi.\n \nJika Anda sudah memiliki akun, silakan login menggunakan email dan password yang terdaftar.',
    listItem: [
      {
        text: 'Buka aplikasi MyBaitullah',
      },
      {
        text: 'Pilih menu Daftar',
        image: IlustrationDaftarAkun2,
      },
      {
        text: 'Isi data diri Anda dengan lengkap dan benar',
        image: IlustrationDaftarAkun3,
      },
      {
        text: 'Verifikasi email dan nomor telepon Anda',
        image: IlustrationDaftarAkun4,
      },
      {
        text: 'Akun Anda sudah terdaftar',
        image: IlustrationDaftarAkun5,
      },
    ],
  },
  {
    id: 2,
    title: 'Hapus Akun',
    icon: <IconUserGreen width={24} height={24} />,
    text: 'Anda dapat menghapus akun Anda kapan saja. Namun, jika Anda menghapus akun Anda, semua data dan informasi yang terkait dengan akun Anda akan dihapus secara permanen dan tidak dapat dipulihkan.\n \nJika Anda ingin menghapus akun Anda, pilih tab Profil, lalu . Klik tombol Hapus Akun. Ikuti langkah-langkah yang diberikan untuk menghapus akun Anda.\n \nJika Anda memiliki pertanyaan lebih lanjut tentang penghapusan akun, silakan hubungi layanan pelanggan kami.',
    listItem: [
      {
        text: 'Buka aplikasi MyBaitullah',
      },
      {
        text: 'Pilih tab Profil',
      },
      {
        text: 'Klik tombol Hapus Akun',
        image: IlustrationHapusAkun1,
      },
      {
        text: 'Ikuti langkah-langkah yang diberikan untuk menghapus akun Anda',
      },
    ],
  },
  {
    id: 3,
    title: 'Metode Pembayaran',
    icon: <IconPaymentGreen width={24} height={24} />,
    text: 'Anda dapat mengatur metode pembayaran yang Anda inginkan di aplikasi MyBaitullah. Anda dapat memilih metode pembayaran yang tersedia, seperti transfer bank, kartu kredit, atau dompet digital.\n \nJika Anda ingin mengubah metode pembayaran Anda, lakukan ketika Anda ingin memesan atau bertransaksi melalui aplikasi MyBaitullah.',
    listItem: [
      {
        text: 'Buka aplikasi MyBaitullah, pilih pesanan anda',
        image: IlustrationMetodePembayaran1,
      },
      {
        text: 'Anda dapat mengatur metode pembayaran Anda di halaman pemesanan. Pilih metode pembayaran yang Anda inginkan',
        image: IlustrationMetodePembayaran2,
      },
      {
        text: 'Bayar sesuai dengan metode pembayaran yang Anda pilih. Pesanan akan otomatis terkonfirmasi setelah pembayaran berhasil dilakukan',
        image: IlustrationMetodePembayaran3,
      },
    ],
  },
  {
    id: 4,
    title: 'Pesanan',
    icon: <IconCartGreen width={24} height={24} />,
    text: 'Untuk melihat riwayat pesanan Anda, buka aplikasi MyBaitullah dan pilih tab Profil, lalu pilih menu Pesanan Saya. Di sana Anda akan melihat semua pesanan yang telah Anda buat, termasuk status pesanan Anda.',
    image: IlustrationPesanan1,
  },
  {
    id: 5,
    title: 'Pembatalan',
    icon: <IconCartOffGreen width={24} height={24} />,
    text: 'Pesanan yang dibatalkan tidak dapat dikembalikan. Jika Anda ingin membatalkan pesanan Anda, silakan hubungi layanan pelanggan kami untuk mendapatkan bantuan lebih lanjut.\n \nJika Anda ingin membatalkan pesanan Anda, lakukan ketika Anda ingin memesan atau bertransaksi melalui aplikasi MyBaitullah.\n \n Pesanan otomatis dibatalkan ketika pembayaran tidak dilakukan dalam waktu 1x24 jam setelah pemesanan.',
  },
  {
    id: 6,
    title: 'Setelah Melakukan Pemesanan',
    icon: <IconCartCheckGreen width={24} height={24} />,
    text: 'Untuk melihat riwayat pesanan Anda, buka aplikasi MyBaitullah dan pilih tab Profil, lalu pilih menu Pesanan Saya. Di sana Anda akan melihat semua pesanan yang telah Anda buat, termasuk status pesanan Anda.\n \nJika Anda ingin melihat tiket atau kode QR yang telah dibuat pada pesanan Anda, buka aplikasi MyBaitullah dan pilih tab Profil, lalu pilih menu Pesanan Saya > pilih menu pesanan Aktif. Di sana Anda akan melihat semua tiket atau kode QR yang telah Anda pesan, termasuk status tiket atau kode QR Anda.',
    listItem: [
      {
        text: 'Buka aplikasi MyBaitullah, pilih tab Profil > Pesanan Saya',
      },
      {
        text: 'Pilih pesanan Aktif',
        image: IlustrationSetelahMelakukanPemesanan1,
      },
      {
        text: 'Anda akan melihat Kode QR atau Tiket yang telah Anda pesan',
        image: IlustrationSetelahMelakukanPemesanan2,
      },
    ],
  },
]

const AdviceAndHelp = ({navigation}) => {
  const width = Dimensions.get('window').width;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const isFiltered = (title) => {
    if (searchText.trim() === '') return false;
    return title.toLowerCase().includes(searchText.toLowerCase());
  };

  const renderTitleWithHighlight = (title) => {
    const lowerTitle = title.toLowerCase();
    const lowerSearch = searchText.toLowerCase();
    const startIndex = lowerTitle.indexOf(lowerSearch);

    if (startIndex === -1 || searchText.trim() === '') {
      return (
        <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textGray300]}>
          {title}
        </Text>
      );
    }

    const endIndex = startIndex + searchText.length;
    const beforeMatch = title.slice(0, startIndex);
    const match = title.slice(startIndex, endIndex);
    const afterMatch = title.slice(endIndex);

    return (
      <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi]}>
        <Text style={BaseStyle.textGray300}>{beforeMatch}</Text>
        <Text style={{ color: '#33C060' }}>{match}</Text>
        <Text style={BaseStyle.textGray300}>{afterMatch}</Text>
      </Text>
    );
  };

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
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Pusat Bantuan</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
        <View style={[BaseStyle.mb10, ({width: '100%'})]}>
          <Text style={[BaseStyle.textLG, BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textCenter, BaseStyle.lh30]}>Halo, apa ada yang bisa dibantu?</Text>
        </View>
        <View>
          <TextInput
            placeholder="Cari bantuan..."
            placeholderTextColor="#696B6B"
            value={searchText}
            onChangeText={handleSearch}
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 12,
              color: '#000000',
              fontSize: 13,
              fontFamily: 'MaisonNeue-Book',
            }}
          />
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
        <View style={{paddingTop: headerHeight * 1.5, paddingHorizontal: 14, backgroundColor: '#2CA44B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} />
        <View style={[BaseStyle.relative, ({top: headerHeight * -0.4})]}>
          <View style={[BaseStyle.wrap]}>
            <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p20, BaseStyle.radius10]}>
              {filteredData.map((item, index) => {
                const isLast = index === data.length - 1;
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    style={[BaseStyle.row,
                      BaseStyle.justifyBetween,
                      BaseStyle.alignItemsCenter,
                      !isLast && BaseStyle.mb20,
                    ]}
                    onPress={() =>
                      navigation.navigate('AdviceAndHelpDetail', {
                        title: item.title,
                        text: item.text,
                        listItem: item.listItem || null,
                        image: item.image || null,
                      })
                    }
                  >
                    <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                      <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius10, BaseStyle.BgLightGreen200]}>
                        { item.icon }
                      </View>
                      {/* <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, isFiltered(item.title) ? { color: '#33C060' } : BaseStyle.textGray300, BaseStyle.ml10]}>{ item.title }</Text> */}
                      <View style={[BaseStyle.pl10]}>{renderTitleWithHighlight(item.title)}</View>
                    </View>
                    <IconCaretRightGreen width={24} height={24} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={[BaseStyle.wrap]}>
            <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p20, BaseStyle.radius10]}>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.mb10]}>Hubungi Kami</Text>
              <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius10, BaseStyle.BgLightGreen200]}>
                  <IconMailGreen width={24} height={24} />
                </View>
                <View style={[BaseStyle.ml10]}>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Email</Text>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonBook, BaseStyle.textGray300]}>info@baitullah.co.id</Text>
                </View>
              </View>
              <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.mb10]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius10, BaseStyle.BgLightGreen200]}>
                  <IconPhoneGreen width={24} height={24} />
                </View>
                <View style={[BaseStyle.ml10]}>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Telepon</Text>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonBook, BaseStyle.textGray300]}>+62817-007-7070</Text>
                </View>
              </View>
              <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius10, BaseStyle.BgLightGreen200]}>
                  <IconWhatsappGreen width={24} height={24} />
                </View>
                <View style={[BaseStyle.ml10]}>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Whatsapp</Text>
                  <Text style={[BaseStyle.textSM, BaseStyle.MaisonBook, BaseStyle.textGray300]}>+62853-1111-1010</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[BaseStyle.wrap, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter]}>
            <View style={{width: "80%"}}>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.lh22, BaseStyle.mb10]}>Butuh bantuan lebih lanjut?</Text>
              <Text style={[BaseStyle.textSM, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textCenter, BaseStyle.lh22, BaseStyle.mb10]}>Hubungi layanan pengaduan konsumen MyBaitullah sekarang.</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textCenter, BaseStyle.lh22]}>Layanan Pengaduan Konsumen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AdviceAndHelp

const styles = StyleSheet.create({})