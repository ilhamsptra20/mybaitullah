import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSearcDarkgreen } from '../../../assets'

const ButtonSearch = ({navigation, text, color, backgroundColor, borderRadius, width='auto', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} navigation={navigation} onPress={onPress} style={styles.container(backgroundColor, borderRadius, width)}>
      <Image source={IconSearcDarkgreen} style={styles.icon} />
      <Text style={styles.text(color)}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonSearch

const styles = StyleSheet.create({
    container: (backgroundColor, borderRadius, width) => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      width: width,
      paddingVertical: 10,
      paddingHorizontal: 20,
    }),
    text: (color) => ({
        fontFamily: 'MaisonNeue-Book',
        fontSize: 14,
        color: color,
    }),
    icon: {
      width: 18,
      height: 18,
      marginRight: 5,
    },
})