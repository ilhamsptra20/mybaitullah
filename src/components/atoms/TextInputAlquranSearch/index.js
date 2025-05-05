import React from 'react'
import { StyleSheet, Text, View, TextInput as TextInputRN, Image } from 'react-native'
import BaseStyle from '../../../assets/style/AppStyle.js'

const TextInputAlquranSearch = ({placeholder, placeholderColor='#696B6B', icon, width='100%', keyboardType, value, onChange, ...restProps}) => {
  return (
    <View style={styles.container(width)}>
      {/* {icon !== null && <Image source={icon} style={[BaseStyle.absolute, BaseStyle.index1, ({width: 18, height: 18, top: 8, left: 8})]} />} */}
      <TextInputRN style={styles.text(placeholderColor)} placeholder={placeholder} keyboardType={keyboardType} {...restProps} placeholderTextColor={placeholderColor} value={value} onChange={onChange} />
    </View>
  )
}

export default TextInputAlquranSearch

const styles = StyleSheet.create({
    container: (width) => ({
      position: 'relative',
      width: width,
    }),
    text: (placeholderColor) =>({
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 12,
      color: placeholderColor,
      fontSize: 13,
      fontFamily: 'MaisonNeue-Book',
    })
})