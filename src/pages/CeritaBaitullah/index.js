import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

// COMPONENT
import { HeaderLogin, HeaderNotLogin, CardBlogHighlight, Carousel, CardBlogVertical, CardBlogHorizontal, ButtonSearch } from '../../components/index.js'
import LinearGradient from 'react-native-linear-gradient';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import categoryCeritaBaitullahData from '../../hook/categoryCeritaBaitullah/categoryCeritaBaitullahFetch.js'
import carouselData from '../../hook/carousel/carouselFetch.js'
import ceritaBaitullahHighlightData from '../../hook/ceritaBaitullahHighlight/ceritaBaitullahHighlightFetch.js'
import ceritaBaitullahTerbaruData from '../../hook/ceritaBaitullahTerbaru/ceritaBaitullahTerbaruFetch.js';
import ceritaBaitullahData from '../../hook/ceritaBaitullah/ceritaBaitullahFetch.js'
import { getItem } from '../../utils/localStorage.js';

const CeritaBaitullah = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(0);

  useEffect(() => {
    getItem("user").then((res) => {
      if (res) {
        setStatus(1);
      }
    });
  }, []);


  // CERITA BAITULLAH CATEGORY
  const { categoryCeritaBaitullah, loadingCategoryCeritaBaitullah, errorCategoryCeritaBaitullah } = categoryCeritaBaitullahData();

  // CAROUSEL DATA
  const { carousel, loadingCarousel, errorCarousel } = carouselData();

  // CERITA BAITULLAH DATA
  const { ceritaBaitullahHighlight, loadingCeritaBaitullahHighlight, errorCeritaBaitullahHighlight } = ceritaBaitullahHighlightData();
  const { ceritaBaitullahTerbaru, loadingCeritaBaitullahTerbaru, errorCeritaBaitullahTerbaru } = ceritaBaitullahTerbaruData();
  const { ceritaBaitullah, loadingCeritaBaitullah, errorCeritaBaitullah } = ceritaBaitullahData();

  const [search, setSearch] = useState(''); // State untuk menyimpan input pencarian
  const filterCeritaBaitullah = ceritaBaitullah.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.navScroll : undefined, ({ paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, backgroundColor: '#2CA44B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 })]}>
        {status === 1 ? (
          <>
            <HeaderLogin />
          </>
        ) : (
          <HeaderNotLogin navigation={navigation} />
        )
        }
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pt10]}>
          <ButtonSearch text="Cari Judul Cerita Baitullah Lainnya" color="#208D33" backgroundColor="#FFFFFF" borderRadius={10} width='100%' onPress={() => navigation.navigate('CeritaBaitullahList')} />
        </View>
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
        {search === '' || search === null || search === undefined ? (
          <>
            {/* CATEGORY */}
            <View style={{ marginTop: StatusBar.currentHeight + 110 }}>
              <View style={BaseStyle.wrap}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Kategori</Text>
              </View>
              {!loadingCategoryCeritaBaitullah ? (
                <FlatList
                  data={categoryCeritaBaitullah}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 10 }}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.5} style={[BaseStyle.w90]} onPress={() => navigation.navigate('CeritaBaitullahList', { category: item.category })}>
                      <LinearGradient colors={['#205374', '#C8FF00', '#33C060']} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.shadow, ({ width: 90, height: 90, borderRadius: 90 })]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.radiusCircle, BaseStyle.BgWhite, ({ width: 85, height: 85 })]}>
                          <Image source={item.image} style={[BaseStyle.w80, BaseStyle.h80]} />
                        </View>
                      </LinearGradient>
                      <Text style={[BaseStyle.MaisonBook, BaseStyle.textXS1, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.mt5]}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <></>
              )
              }
            </View>

            {/* CAROUSEL */}
            <View style={[BaseStyle.mb10]}>
              <Carousel carousel={carousel} pagination={true} />
            </View>

            {/* HIGHLIGHT */}
            <View>
              <View style={BaseStyle.wrap}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Sorotan Cerita Baitullah</Text>
              </View>
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

            {/* CERITA TERBARU */}
            <View style={[BaseStyle.mt20]}>
              <View style={BaseStyle.wrap}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Terbaru</Text>
              </View>
              {!loadingCeritaBaitullahTerbaru ? (
                <FlatList
                  data={ceritaBaitullahTerbaru}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 14 }}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={({ item }) => (
                    <CardBlogVertical thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} onPress={() => navigation.navigate('CeritaBaitullahDetail', { idCeritaBaitullahTerbaru: item.id })} />
                  )}
                />
              ) : (
                <></>
              )
              }
            </View>

            {/* CERITA LAINNYA */}
            <View style={[BaseStyle.wrap, BaseStyle.mb70, BaseStyle.mt10]}>
              <View style={BaseStyle.mb10}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Lainnya</Text>
              </View>
              <View>
                {!loadingCeritaBaitullah ? (
                  <>
                    {ceritaBaitullah.map((item, y) => {
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
            </View>
          </>
        ) : (
          <View style={{ marginTop: 125 }}>
            {/* CERITA LAINNYA */}
            <View style={[BaseStyle.wrap, BaseStyle.mb70, BaseStyle.mt10]}>
              <View style={BaseStyle.mb10}>
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Lainnya</Text>
              </View>
              <View>
                {!loadingCeritaBaitullah ? (
                  <>
                    {filterCeritaBaitullah.map((item, y) => {
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
            </View>
          </View>
        )
        }
      </ScrollView>
    </View>
  )
}

export default CeritaBaitullah

const styles = StyleSheet.create({})