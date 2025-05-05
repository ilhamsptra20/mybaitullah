import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'
import { IconCheckGreen } from '../../../assets/index.js';

const CheckBox = ({ label, onPress, isChecked }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
      <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius6, BaseStyle.borderLightGreen500, isChecked ? BaseStyle.BgLightGreen200 : BaseStyle.BgWhite]}>
        {isChecked && (
          <IconCheckGreen width={14} height={14} />
        )}
      </View>
      <Text style={[BaseStyle.MaisonBook, isChecked === true ? BaseStyle.textDarkGreen500 : BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.ml10]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
