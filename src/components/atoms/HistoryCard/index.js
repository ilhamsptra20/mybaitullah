import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconBookGreen, IconArrowRightGreen } from '../../../assets/index.js';
import BaseStyle from '../../../assets/style/AppStyle.js';

const HistoryCard = ({ history, openSurah }) => {
  return (
    <View style={[BaseStyle.wrap, { marginBottom: 10 }]}>
      <View style={[BaseStyle.p10, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radius10]}>
        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10]}>
          Riwayat Bacaan Terakhir
        </Text>
        <TouchableOpacity
          onPress={() =>
            openSurah({ nomor: history.nomor, nama_latin: history.nama_latin }, history.lastAyah)
          }
          style={[
            BaseStyle.row,
            BaseStyle.justifyBetween,
            BaseStyle.alignItemsCenter,
            BaseStyle.p20,
            BaseStyle.BgLightGreen200,
            BaseStyle.radius10,
          ]}
        >
          <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
            <IconBookGreen width={38} height={38} />
            <View style={[BaseStyle.pl20]}>
              <Text style={[BaseStyle.MaisonDemi, BaseStyle.textDarkGreen500, BaseStyle.textXS, BaseStyle.mb5]}>
                {history.nama_latin} - Ayat {history.lastAyah}
              </Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS1]}>
                Lanjutkan membaca
              </Text>
            </View>
          </View>
          <IconArrowRightGreen width={18} height={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HistoryCard;
