import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput as TextInputRN, Image } from 'react-native'
import BaseStyle from '../../../assets/style/AppStyle.js'

const TextInput = ({lable, placeholder, placeholderColor='#696B6B', icon, width='100%', borderColor= '#D9D9D9', keyboardType, autoCapitalize='words', autoComplete='username', inputMode, value, onChange, maxLength, characterLength, characterMax, editable=true, ...restProps}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[editable ? BaseStyle.BgWhite : BaseStyle.BgGray100, styles.container(width, isFocused ? '#208D33' : borderColor), BaseStyle.radius10]}>
      <Text style={[BaseStyle.absolute, BaseStyle.MaisonBold, isFocused ? BaseStyle.textDarkGreen500 : BaseStyle.textBlack, BaseStyle.textXS, editable ? BaseStyle.BgWhite : BaseStyle.BgGray100, BaseStyle.mb10, BaseStyle.index1, ({left: 10, top: 10})]}>{lable}</Text>
      {/* {icon !== null && <Image source={icon} style={[BaseStyle.absolute, BaseStyle.index1, ({width: 18, height: 18, top: 8, left: 8})]} />} */}
      {characterLength && <Text style={[BaseStyle.absolute, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10, BaseStyle.index1, ({right: 10, top: 10})]}>{characterMax}/50</Text>}
      <TextInputRN style={styles.text(placeholderColor)} placeholder={placeholder} keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoComplete={autoComplete} inputMode={inputMode} {...restProps} value={value} placeholderTextColor={placeholderColor} maxLength={maxLength} editable={editable} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
    </View>
  )
}

export default TextInput

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
    })
})