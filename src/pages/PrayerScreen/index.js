import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, ImageBackground } from "react-native";

// STYLE
import BaseStyle from '../../assets/style/AppStyle';

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';

const PrayerScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  const fetchBabDoa = async () => {
    try {
      const res = await fetch("https://api.baitullah.co.id/api/doa/get_doa_bab");
      const json = await res.json();
      console.log(json.data);

      setData(json.data);
    } catch (error) {
      console.error("Error fetching doa bab:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToNext = (item) => {
    if (item.total_kategori > 0) {
      navigation.navigate("SubPrayerScreen", {
        idBab: item.id_doa_bab,
        title: item.title,
      });
    } else {
      navigation.navigate("SubPrayerScreen", {
        idBab: item.id_doa_bab,
        idKat: 0,
        title: item.title,
      });
    }
  };

  useEffect(() => {
    fetchBabDoa();
  }, []);

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
            ) : (
              data.map((item, idx) => (
                <TouchableOpacity key={idx} onPress={() => goToNext(item)} style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.p10, BaseStyle.mb10, BaseStyle.shadow, BaseStyle.radius10]} >
                  <ImageBackground source={{ uri: `https://api.baitullah.co.id/uploads/doa/${item.gambar}` }}>
                    {/* <Image source={{ uri: `https://api.baitullah.co.id/uploads/doa/${item.gambar}` }} style={{ width: 60, height: 60, borderRadius: 10 }} /> */}
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text numberOfLines={2} style={[BaseStyle.textBlack, BaseStyle.MaisonDemi]}>{item.keterangan}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrayerScreen;
