import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput as TextInputRN, Image, TouchableOpacity } from 'react-native'
import { IconEyeActive, IconEyeNonactive } from '../../../assets'

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'

const TextInputPassword = ({lable, placeholder, placeholderColor='#696B6B', icon, width='100%', borderColor= '#D9D9D9', keyboardType, autoCapitalize='sentences', autoComplete='password', inputMode, value, onChange, maxLength, characterLength, characterMax, editable=true, ...restProps}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const Hide = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  return (
    <View style={[editable ? BaseStyle.BgWhite : BaseStyle.BgGray100, styles.container(width, isFocused ? '#208D33' : borderColor), BaseStyle.radius10]}>
      <Text style={[BaseStyle.absolute, BaseStyle.MaisonBold, isFocused ? BaseStyle.textDarkGreen500 : BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10, BaseStyle.index1, ({left: 10, top: 10})]}>{lable}</Text>
      <TextInputRN style={[editable ? BaseStyle.BgWhite : BaseStyle.BgGray100, styles.text(placeholderColor)]} placeholder={placeholder} keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoComplete={autoComplete} inputMode={inputMode} secureTextEntry={!secureTextEntry} {...restProps} placeholderTextColor={placeholderColor} maxLength={maxLength} editable={editable} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      <TouchableOpacity style={styles.iconContainer} onPress={Hide}>
        {secureTextEntry ? <IconEyeActive width={24} height={24} /> : <IconEyeNonactive width={24} height={24} />}
      </TouchableOpacity>
    </View>
  )
}

export default TextInputPassword

const styles = StyleSheet.create({
    container: (width, borderColor) => ({
      position: 'relative',
      width: width,
      paddingHorizontal: 8,
      paddingTop: 24,
      borderColor: borderColor,
      borderWidth: 1,
    }),
    text: (placeholderColor) =>({
      alignItems: 'center',
      color: placeholderColor,
      fontSize: 13,
      fontFamily: 'MaisonNeue-Book',
    }),
    iconContainer: {
      position: 'absolute',
      right: 8,
      top: 16
    },
    icon: {
      width: 24,
      height: 24,
    },
})