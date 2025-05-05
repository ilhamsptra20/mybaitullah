import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BaseStyle from '../../../assets/style/AppStyle.js';

const SurahItem = ({ item, openSurah }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={() => openSurah(item)}
        style={[
          BaseStyle.p20,
          BaseStyle.BgWhite,
          BaseStyle.shadow,
          BaseStyle.radius20,
          { marginHorizontal: 14 },
        ]}
      >
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.wFull]}>
          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsLeft, BaseStyle.w40, BaseStyle.h40]}>
              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textDarkGreen500, BaseStyle.textMD]}>
                {item.nomor}
              </Text>
            </View>
            <View>
              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textDarkGreen500, BaseStyle.textSM]}>
                {item.nama_latin}
              </Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1]}>
                {item.arti}
              </Text>
            </View>
          </View>
          <View style={BaseStyle.alignItemsRight}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textDarkGreen500, BaseStyle.textLG]}>
              {item.nama}
            </Text>
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1]}>
              {item.jumlah_ayat} ayat
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SurahItem;
