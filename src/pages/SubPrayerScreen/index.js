import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StatusBar } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// STYLE
import BaseStyle from '../../assets/style/AppStyle';

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';

const SubPrayerScreen = () => {
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  const route = useRoute();
  const navigation = useNavigation();
  const { idBab, idKat = null, title } = route.params;

  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idKatState, setIdKatState] = useState(idKat);

  const fetchKategori = async () => {
    try {
      console.log(`Fetching kategori for idBab: ${idBab}, idKat: ${idKatState}`);

      const url = (idKatState == 0)
        ? `https://api.baitullah.co.id/api/doa/get_doa/1/0`
        : `https://api.baitullah.co.id/api/doa/get_doa_kategori/${idBab}`;
      console.log("url", url);

      const res = await fetch(url);
      const json = await res.json();

      const data = json.data || [];
      setKategoriList(data);
    } catch (error) {
      console.error("Error fetching kategori:", error);
      setKategoriList([]);
    } finally {
      setLoading(false);
    }
  };

  const goToNext = (item) => {

    if (idKatState !== null) {
      navigation.navigate("DetailPrayerScreen", {
        idBab,
        idKat: item.id_doa_kategori,
        title: item.nama_kategori,
        doa: item,
      });
    } else {
      setIdKatState(item.id_doa_kategori);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, [idKatState]);

  return (
    <View style={BaseStyle.container}>
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
          <View style={[BaseStyle.alignItemsCenter]}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>Doa</Text>
          </View>
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
        <View style={{flex: 1, paddingTop: headerHeight}}>
          <View style={[BaseStyle.wrap]}>
            {loading ? (
              <ActivityIndicator size="large" color="#208D33" />
            ) : kategoriList.length > 0 ? (
              kategoriList.map((item, idx) => (
                <TouchableOpacity key={idx} onPress={() => goToNext(item)} style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.p10, BaseStyle.mb10, BaseStyle.shadow, BaseStyle.radius10]}>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text numberOfLines={2} style={[BaseStyle.textBlack, BaseStyle.MaisonDemi]}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[BaseStyle.textCenter, BaseStyle.textGray300]}>Kategori tidak tersedia.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubPrayerScreen;
