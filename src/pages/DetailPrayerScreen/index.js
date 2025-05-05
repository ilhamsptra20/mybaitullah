import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StatusBar, useWindowDimensions, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';

// STYLE
import BaseStyle from '../../assets/style/AppStyle';

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';

const DetailPrayerScreen = ({navigation}) => {
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  const route = useRoute();
  const { idBab, idKat, title, doa } = route.params;

  const { width } = useWindowDimensions();

  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const detailDoa = doa.deskripsi || "";

  console.log("doa", doa);

  const source = {
    html: detailDoa,
  };

  const tagsStyles = {
    a: {
      color: 'blue',
    },
    p: {
      fontSize: 16,
      whiteSpace: 'normal',
      color: '#000',
      fontFamily: 'MaisonNeue-Book',
    },
  };

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
            <View style={[BaseStyle.p10, BaseStyle.BgWhite, BaseStyle.radius10, BaseStyle.shadow]}>
              <RenderHtml
                contentWidth={width}
                source={source}
                tagsStyles={tagsStyles}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailPrayerScreen;
