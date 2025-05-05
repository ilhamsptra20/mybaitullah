import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

// COMPONENT
import LinearGradient from 'react-native-linear-gradient';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'

const index = ({menu, navigation}) => {
  const limitedData = menu.slice(0, 3);
  return (
    <>
        {limitedData.map((item, y) => {
            return (
                <TouchableOpacity activeOpacity={0.7} key={y} style={[BaseStyle.w70, BaseStyle.alignItemsCenter]} onPress={() => navigation.navigate(`${item.navigation}`)}>
                    <LinearGradient colors={item.color} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w60, BaseStyle.h60, BaseStyle.radius60]}>
                        <Image source={item.icon} style={[BaseStyle.w40, BaseStyle.h40]} />
                    </LinearGradient>
                    <Text style={[BaseStyle.textXS2, BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.pt5]}>{item.title}</Text>
                </TouchableOpacity>
            )
        })}
    </>
  )
}

export default index

const styles = StyleSheet.create({})