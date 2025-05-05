import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'

const Button = ({navigation, text, color, backgroundColor, borderRadius, borderColor=null, width='auto', paddingVertical=6, icon=null, disabled, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} navigation={navigation} onPress={onPress} style={styles.container(backgroundColor, borderRadius, borderColor, width)}>
      {icon !== null && icon}
      <Text style={styles.text(color, paddingVertical)}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: (backgroundColor, borderRadius, borderColor, width) => ({
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      width: width,
      borderWidth: borderColor === null ? 0 : 1,
      borderColor: borderColor
    }),
    text: (color, paddingVertical) => ({
        fontFamily: 'MaisonNeue-Book',
        fontSize: 14,
        color: color,
        paddingVertical: paddingVertical,
        paddingHorizontal: 20,
    }),
})