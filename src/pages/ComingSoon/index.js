import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// COMPONENT
import { Button } from '../../components/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// ASSETS IMAGES
import { IlustrationSplashScreen02 } from '../../assets/index.js';

const ComingSoon = ({ navigation }) => {
    return (
        <View style={[BaseStyle.container, BaseStyle.wrap]}>
            <View style={{ flex: 0.5 }}>
                <IlustrationSplashScreen02 width="100%" height="100%" />
            </View>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[BaseStyle.textLG, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.pb5]}>Segera Hadir</Text>
                <Text style={[BaseStyle.textSM, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textCenter, BaseStyle.pb50]}>Tiket belum tersedia</Text>
                <Button text="Kembali" color="#FFFFFF" backgroundColor="#33C060" borderRadius={24} width='100%' paddingVertical={14} onPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}

export default ComingSoon

const styles = StyleSheet.create({})