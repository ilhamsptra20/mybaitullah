import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button, CardBlogHorizontal } from '../../components/index.js';

// ICON
import {IconArrowLeftWhite, IconArrowLeftBlack, IconShareGrey, IconUserGrey} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import ceritaBaitullahHighlightData from '../../hook/ceritaBaitullahHighlight/ceritaBaitullahHighlightFetch.js'
import ceritaBaitullahTerbaruData from '../../hook/ceritaBaitullahTerbaru/ceritaBaitullahTerbaruFetch.js';
import ceritaBaitullahData from '../../hook/ceritaBaitullah/ceritaBaitullahFetch.js'

const CeritaBaitullahDetail = ({navigation}) => {
  // AMBIL ID CERITA BAITULLAH
  const route = useRoute();
  const { idCeritaBaitullahHighlight, idCeritaBaitullahTerbaru, idCeritaBaitullah } = route.params || {};

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  // CERITA BAITULLAH DATA
  const {ceritaBaitullahHighlight, loadingCeritaBaitullahHighlight, errorCeritaBaitullahHighlight} = ceritaBaitullahHighlightData();
  const {ceritaBaitullahTerbaru, loadingCeritaBaitullahTerbaru, errorCeritaBaitullahTerbaru} = ceritaBaitullahTerbaruData();
  const {ceritaBaitullah, loadingCeritaBaitullah, errorCeritaBaitullah} = ceritaBaitullahData();
  
  // MENENTUKAN CERITA YANG DIPILIH BERDASARKAN ID
  const selectedCeritaBaitullah = 
    ceritaBaitullahHighlight.find((item) => item.id === idCeritaBaitullahHighlight) ||
    ceritaBaitullahTerbaru.find((item) => item.id === idCeritaBaitullahTerbaru) ||
    ceritaBaitullah.find((item) => item.id === idCeritaBaitullah);

  // ANIMASI ZOOM IMAGE
  const scrollY = new Animated.Value(0);

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.BgWhite : BaseStyle.BgTrasnparent, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.BgTrasnparent]} onPress={() => navigation.goBack()}>
            {navShadow === true ? (
                <IconArrowLeftBlack width={20} height={20} />
              ) : (
                <IconArrowLeftWhite width={20} height={20} />
              )
            }
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, navShadow === true ? BaseStyle.textBlack : BaseStyle.textWhite, BaseStyle.textXL]}>Cerita Baitullah</Text>
          <View style={[BaseStyle.w30, BaseStyle.w30]} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              let offset = event.nativeEvent.contentOffset.y;
              setNavShadow(offset >= 1);
            },
          }
        )}
        scrollEventThrottle={16}
      >
        <View>
          {!loadingCeritaBaitullahHighlight ? (
              <View>
                {(() => {
                  return (
                    <>
                      {/* IMAGE DETAIL */}
                      <View style={[BaseStyle.relative]}>
                        <Animated.Image 
                          source={selectedCeritaBaitullah.pictureDetail} 
                          style={[
                            BaseStyle.wFull, 
                            BaseStyle.hAuto, 
                            BaseStyle.rectangle, 
                            BaseStyle.objectFit, 
                            BaseStyle.shadow,
                            {
                              transform: [{
                                scale: scrollY.interpolate({
                                  inputRange: [-200, 0, 200], // Scroll position range
                                  outputRange: [1.2, 1, 1.2], // Zoom in / out effect
                                  extrapolate: 'clamp' // Prevents zooming out further when scrolling down
                                })
                              }]
                            }
                          ]}
                        />
                        <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.BgOverlay, BaseStyle.index1]} />
                        <View style={[BaseStyle.justifyContentRight, BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.index2]}>
                          <View style={[BaseStyle.wrap, ({paddingBottom: 50})]}>
                            <View style={[BaseStyle.pv5, BaseStyle.ph20, BaseStyle.radius20, BaseStyle.BgDarkGreen500, BaseStyle.mb10, ({alignSelf: 'flex-start'})]}>
                              <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textXS1, BaseStyle.lh20, BaseStyle.textCapitalize]}>{selectedCeritaBaitullah.category}</Text>
                            </View>
                            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textLG, BaseStyle.lh24]}>{selectedCeritaBaitullah.title}</Text>
                          </View>
                        </View>
                      </View>
            
                      <View style={[BaseStyle.relative, BaseStyle.BgWhite, ({paddingTop: 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: -30, zIndex: 1, minHeight: height * 0.54})]}>
                        <View style={[BaseStyle.wrap, BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                            <IconUserGrey width={34} height={34} />
                            <View style={[BaseStyle.ml10]}>
                              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>By {selectedCeritaBaitullah.writer}</Text>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS]}>{selectedCeritaBaitullah.releaseDate}</Text>
                            </View>
                          </View>
                          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius40, BaseStyle.borderGray200]}>
                            <IconShareGrey width={18} height={18} />
                          </TouchableOpacity>
                        </View>
                        <View style={[BaseStyle.wrap]}><View style={[BaseStyle.wFull, BaseStyle.BgGray100, ({height: 1})]} /></View>
                        <View style={[BaseStyle.wrap]}>
                          <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.lh22, BaseStyle.textJustify, BaseStyle.mb10]}>{selectedCeritaBaitullah.description}</Text>
                        </View>
                        <View style={[BaseStyle.wrap]}><View style={[BaseStyle.wFull, BaseStyle.BgGray100, ({height: 1})]} /></View>
                        <View style={[BaseStyle.wrap]}>
                          <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb20]}>Tags:</Text>
                          <View style={[BaseStyle.row, BaseStyle.flexWrap]}>
                            <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.pv10, BaseStyle.ph20, BaseStyle.radius4, BaseStyle.BgCream, BaseStyle.mb10, BaseStyle.mr10]}>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS]}>#Umroh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.pv10, BaseStyle.ph20, BaseStyle.radius4, BaseStyle.BgCream, BaseStyle.mb10, BaseStyle.mr10]}>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS]}>#Kabarumroh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.pv10, BaseStyle.ph20, BaseStyle.radius4, BaseStyle.BgCream, BaseStyle.mb10, BaseStyle.mr10]}>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS]}>#Masjidilharam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.pv10, BaseStyle.ph20, BaseStyle.radius4, BaseStyle.BgCream, BaseStyle.mb10, BaseStyle.mr10]}>
                              <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS]}>#Makkah</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{paddingHorizontal: 14}}><View style={[BaseStyle.wFull, BaseStyle.BgGray100, ({height: 1})]} /></View>
                        {/* CERITA LAINNYA */}
                        <View style={[BaseStyle.wrap, BaseStyle.mt10]}>
                          <View style={BaseStyle.mb10}>
                            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Lainnya</Text>
                          </View>
                          <View>
                            {!loadingCeritaBaitullah ? (
                                <>
                                  {ceritaBaitullah.map((item, y) => {
                                    return (
                                      <CardBlogHorizontal key={y} thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} onPress={() => navigation.navigate('CeritaBaitullahDetail', {idCeritaBaitullah: item.id})} />
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
                    </>
                  );
                })()}
              </View>
            ) : (
              <></>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default CeritaBaitullahDetail

const styles = StyleSheet.create({})