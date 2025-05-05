import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, StatusBar, FlatList, Modal, Animated, TouchableOpacity, Platform } from 'react-native'

// COMPONENT
import { HeaderLogin, HeaderNotLogin, Button, Carousel, StepTabungan, GridTiket, Accordion, CardBlogHighlight, CardBlogHorizontal, Menu, Menu2, JadwalShalat, Timer } from '../../components'
import LinearGradient from 'react-native-linear-gradient';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// ICON
import { IconAlquran, IconDoa, IconKiblat, IconMenuWhite, IconXMarkWhite, IlustrationEmptyContent, IlustrationEmptyContent02, IlustrationPattern1, IlustrationPattern2, maghrib } from '../../assets';

// API
import userData from '../../hook/user/userFetch.js'
import carouselData from '../../hook/carousel/carouselFetch.js'
import jadwalShalatData from '../../api/apiJadwalShalat/apiJadwalShalat.js'
import locationData from '../../hook/location/locationFetch.js'
import ticketData from '../../hook/ticket/ticketFetch.js'
import stepTabunganData from '../../hook/stepTabungan/stepTabunganFetch.js'
import tabunganData from '../../hook/tabungan/tabunganFetch.js'
import ceritaBaitullahHighlightData from '../../hook/ceritaBaitullahHighlight/ceritaBaitullahHighlightFetch.js'
import ceritaBaitullahData from '../../hook/ceritaBaitullah/ceritaBaitullahFetch.js'
import { getItem } from '../../utils/localStorage.js';

// SKELETON WIDTH
const cardWidth = Dimensions.get('window').width * 1;
const skeWidth = cardWidth - 32;

const height = Dimensions.get("window");

// MENU
const menu = [
  {
    id: 1,
    icon: require('../../assets/icon/icon-alquran-02.png'),
    title: 'Al-Quran',
    color: ['#AbE0EE', '#7CC3D5'],
    navigation: 'QuranListScreen'
  },
  {
    id: 2,
    icon: require('../../assets/icon/icon-doa-02.png'),
    title: 'Doa Baitullah',
    color: ['#7CC3D5', '#3DCBB1'],
    navigation: 'PrayerScreen'
  },
  {
    id: 3,
    icon: require('../../assets/icon/icon-kiblat-02.png'),
    title: 'Kiblat',
    color: ['#7CC3D5', '#076277'],
    navigation: 'QiblaScreen'
  },
  {
    id: 4,
    icon: require('../../assets/icon/icon-tiket-02.png'),
    title: 'Tiket',
    color: ['#AbE0EE', '#7CC3D5'],
    navigation: 'ComingSoon'
  },
  {
    id: 5,
    icon: require('../../assets/icon/icon-cerita-baitullah-02.png'),
    title: 'Cerita Baitullah',
    color: ['#AbE0EE', '#7CC3D5'],
    navigation: 'Cerita Baitullah'
  },
];
// Fungsi untuk membagi data ke dalam baris
const chunkData = (menu, numColumns) => {
  const rows = [];
  for (let i = 0; i < menu.length; i += numColumns) {
    rows.push(menu.slice(i, i + numColumns));
  }

  // Pastikan baris terakhir memiliki elemen kosong jika kurang dari numColumns
  const lastRow = rows[rows.length - 1];
  if (lastRow && lastRow.length < numColumns) {
    while (lastRow.length < numColumns) {
      lastRow.push({ id: `empty-${lastRow.length}`, name: "empty", empty: true });
    }
  }

  return rows;
};

const rows = chunkData(menu, 4); // Membagi data menjadi baris dengan 4 kolom

const Home = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // HEADER HEIGHT
  const [header, setHeader] = useState(0);

  // BOTTOM SHEET
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(0);

  // USER DATA
  const { user, loadingUser, errorUser } = userData();

  // CAROUSEL DATA
  const { carousel, loadingCarousel, errorCarousel } = carouselData();

  // TICKET DATA
  const { ticket, loadingTicket, errorTicket } = ticketData();
  const limitTicket = ticket.slice(0, 6);

  // STEP TABUNGAN DATA
  const { stepTabungan, loadingSteptabungan, errorSteptabungan } = stepTabunganData();

  // TABUNGAN DATA
  const { tabungan, loadingTabungan, errorTabungan } = tabunganData();

  // CERITA BAITULLAH DATA
  const { ceritaBaitullahHighlight, loadingCeritaBaitullahHighlight, errorCeritaBaitullahHighlight } = ceritaBaitullahHighlightData();
  const { ceritaBaitullah, loadingCeritaBaitullah, errorCeritaBaitullah } = ceritaBaitullahData();
  const limitCeritaBaitullah = ceritaBaitullah.slice(0, 5);


  useEffect(() => {
    getItem("user").then((res) => {
      if (res) {
        setStatus(1);
      }
    });
  }, []);

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />
      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow === true ? BaseStyle.navScroll : undefined,
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
          setHeader(height);
        }}
      >
        {status === 1 ? (
          <>
            <HeaderLogin />
          </>
        ) : (
          <HeaderNotLogin navigation={navigation} />
        )
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          let offset = e.nativeEvent.contentOffset.y
          if (offset >= 1) {
            setNavShadow(true)
          } else {
            setNavShadow(false)
          }
        }}
      >
        <ImageBackground source={IlustrationPattern2} style={[BaseStyle.header, BaseStyle.justifyContentRight, ({ paddingTop: header })]}>
          {/* CAROUSEL */}
          <View style={BaseStyle.pb90}>
            <Carousel carousel={carousel} />
          </View>
        </ImageBackground>

        {/* CONTENT */}
        <View style={BaseStyle.contentHome}>
          {/* MENU */}
          <View style={[BaseStyle.wrap, BaseStyle.wFull, BaseStyle.alignItemsCenter]}>
            <View style={[BaseStyle.menu]}>
              <Menu2 menu={menu} navigation={navigation} />
              <View style={[BaseStyle.w70, BaseStyle.alignItemsCenter]}>
                <TouchableOpacity onPress={openBottomSheet} activeOpacity={0.7}>
                  <LinearGradient colors={['#82E49B', '#239647']} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w60, BaseStyle.h60, BaseStyle.radius60]}>
                    <IconMenuWhite width={30} height={30} />
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.pt5]}>Lainnya</Text>
              </View>
            </View>
          </View>

          {/* JADWAL SHOLAT */}
          <View style={[BaseStyle.wrap, BaseStyle.mt65]}>
            <JadwalShalat />
          </View>

          {/* CERITA BAITULLAH */}
          <View>
            <View style={BaseStyle.wrap}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Baitullah</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>Baca cerita dari Baitullah</Text>
            </View>

            {/* HIGHLIGHT */}
            <View>
              {!loadingCeritaBaitullahHighlight ? (
                <FlatList
                  data={ceritaBaitullahHighlight}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 14 }}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={({ item }) => (
                    <CardBlogHighlight thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} onPress={() => navigation.navigate('CeritaBaitullahDetail', { idCeritaBaitullahHighlight: item.id })} />
                  )}
                />
              ) : (
                <></>
              )
              }
            </View>

            {/* CERITA LAINNYA */}
            <View style={BaseStyle.wrap}>
              <View>
                {!loadingCeritaBaitullah ? (
                  <>
                    {limitCeritaBaitullah.map((item, y) => {
                      return (
                        <CardBlogHorizontal key={y} thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} onPress={() => navigation.navigate('CeritaBaitullahDetail', { idCeritaBaitullah: item.id })} />
                      )
                    })}
                  </>
                ) : (
                  <></>
                )
                }
              </View>
              <View style={[BaseStyle.wrap, BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.wFull]}>
                <Button text="Baca Cerita Lainnya" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} onPress={() => navigation.navigate('Cerita Baitullah')} />
              </View>
            </View>
          </View>

          {/* TIKET */}
          <View>
            <View style={BaseStyle.wrap}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Baitullah Event</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>Ikuti keseruannya bersama Baitullah</Text>
            </View>
            {!loadingTicket ? (
              <>
                {ticket.length > 0 ? (
                  <View>
                    <GridTiket data={limitTicket} navigation={navigation} />
                    <View style={[BaseStyle.mb10, BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.wFull]}>
                      <Button text="Lihat Tiket Lainnya" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} onPress={() => navigation.navigate('Ticket')} />
                    </View>
                  </View>
                ) : (
                  // <View style={[BaseStyle.wrap]}>
                  //   <LinearGradient colors={['#33C060', '#D6F2DF']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape]}></LinearGradient>
                  // </View>
                  <View style={[BaseStyle.wrap]}>
                    <View style={[BaseStyle.alignItemsCenter, BaseStyle.borderGray100, BaseStyle.radius10, BaseStyle.p10]}>
                      <Image source={IlustrationEmptyContent02} style={[BaseStyle.wFull, BaseStyle.h200, BaseStyle.rectangle]} />
                      <View style={[BaseStyle.mv20]}>
                        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter]}>Tidak ada event</Text>
                        <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter]}>Saat ini belum ada event</Text>
                      </View>
                    </View>
                  </View>
                )
                }
              </>
            ) : (
              <></>
            )
            }
          </View>

          {/* TABUNGAN */}
          <View style={[BaseStyle.wrap, ({ marginBottom: 24 })]}>
            <View style={BaseStyle.mb15}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Menabung di Baitullah</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textSM]}>Nabung dulu di Baitullah yuk!</Text>
            </View>

            {/* Step Menabung */}
            <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p20, BaseStyle.radius10, BaseStyle.mb20]}>
              <StepTabungan data={stepTabungan} />
            </View>

            {/* BANK */}
            <View style={[BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.pt20, BaseStyle.pl20, BaseStyle.pr20, BaseStyle.radius10]}>
              {!loadingTabungan ? (
                <>
                  {tabungan.map((value, y) => {
                    return (
                      <Accordion key={y} logo={value.logo} brand={value.brand}>
                        <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.textJustify, BaseStyle.lh20]}>{value.description}</Text>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.wFull, BaseStyle.mt10]}>
                          <Button text="Mulai Menabung" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} onPress={() => Linking.openURL(`${value.link}`)} />
                        </View>
                      </Accordion>
                    )
                  })}
                </>
              ) : (
                <></>
              )
              }
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BottomSheet Modal */}
      <Modal
        transparent
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <View style={styles.bottomSheetoverlay}>
          {/* Close Area */}
          <TouchableOpacity
            style={styles.bottomSheetcloseArea}
            onPress={closeBottomSheet}
          />

          {/* BottomSheet Content */}
          <Animated.View style={styles.bottomSheet}>
            <View style={[BaseStyle.alignItemsCenter, BaseStyle.pb20]}>
              <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({ height: 4 })]} />
            </View>
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Aktivitas Lainnya</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheet} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                <IconXMarkWhite width={12} height={12} />
              </TouchableOpacity>
            </View>
            {rows.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={[BaseStyle.row, row.length === 4 ? BaseStyle.justifyBetween : BaseStyle.justifyContentLeft, BaseStyle.mb20]}>
                  {row.map((item, y) => {
                    return (
                      <TouchableOpacity activeOpacity={0.7} key={y} style={[BaseStyle.w70, BaseStyle.alignItemsCenter]} onPress={() => navigation.navigate(item.navigation)}>
                        <LinearGradient colors={item.empty ? ['#FFFFFF', '#FFFFFF'] : ['#82E49B', '#239647']} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w60, BaseStyle.h60, BaseStyle.radius60, item.empty && BaseStyle.BgTrasnparent]}>
                          <Image source={item.icon} style={[BaseStyle.w40, BaseStyle.h40]} />
                        </LinearGradient>
                        <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.pt5]}>{item.title}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            })}
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  menuItems: {
    width: '31.5%',
    height: 'auto',
  },

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
    height: height * 0.4, // Bottom sheet height (40% of screen)
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1000, // Ensure the sheet stays on top
  },
})