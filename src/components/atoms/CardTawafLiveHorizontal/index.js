import { StyleSheet, Text, TouchableOpacity, View, Image, Share } from 'react-native'
import React, {useState} from 'react'
import BaseStyle from '../../../assets/style/AppStyle.js';
import { IconCalendarGrey, IconShareGrey } from '../../../assets/index.js';
import Button from '../Button/index.js';

const CardTawafLiveHorizontal = ({navigation, onPress, image, channelName, hostName, travelName, periodDate, periodTime, passCode, myChannel, share}) => {
  const [text, setText] = useState(`
Maksimalkan momen ibadahmu dengan Tawaf Live Bersama Baitullah! Yuk gabung dan rasakan pengalaman thawaf yang lebih khusyuk dan bermakna.

Nama Channel: ${channelName}
Travel: ${travelName}
Pembicara: ${hostName}
Tanggal & waktu: ${periodDate} - ${periodTime}
Passcode: ${passCode}

https://baitullah.co.id
  `);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View activeOpacity={0.7} style={[styles.container, BaseStyle.mb10]}>
      <View style={[BaseStyle.relative, BaseStyle.row, BaseStyle.pb10]}>
        <View>
          <View style={[BaseStyle.absolute, BaseStyle.w80, BaseStyle.h80, BaseStyle.BgOverlay, BaseStyle.radius8, BaseStyle.index1]} />
          <Image source={image} style={[BaseStyle.w80, BaseStyle.h80, BaseStyle.radius8]} />
        </View>
        {share === true ? (
            <View style={[BaseStyle.row, BaseStyle.pl10, ({width: '77.5%'})]}>
              <View style={{width: '80%'}}>
                <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textLightGreen500, BaseStyle.mb5]}>{travelName}</Text>
                <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh20]} numberOfLines={3}>{channelName}</Text>
                <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.mr5]}>Pembicara</Text>
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300]}>{hostName}</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <IconCalendarGrey width={12} height={12} />
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.ml5]}>{periodDate} - {periodTime}</Text>
                </View>
              </View>
              <View style={[BaseStyle.alignItemsRight, ({width: '20%'})]}>
                <TouchableOpacity onPress={onShare} activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.borderGray200]}>
                  <IconShareGrey width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[BaseStyle.pl10, ({width: '77.5%'})]}>
              <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textLightGreen500, BaseStyle.mb5]}>{travelName}</Text>
                <Text style={[BaseStyle.textSM, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.lh20]} numberOfLines={3}>{channelName}</Text>
                <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.mr5]}>Pembicara</Text>
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300]}>{hostName}</Text>
                </View>
                <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                    <IconCalendarGrey width={12} height={12} />
                    <Text style={[BaseStyle.textXS1, BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.ml5]}>{periodDate} - {periodTime}</Text>
                </View>
            </View>
          )
        }
      </View>
      {myChannel ? (
          <View style={[BaseStyle.pb10]}>
            <Button text="Mulai Siaran" color="#33C060" backgroundColor="#FFFFFF" borderColor="#33C060" borderRadius={20} width='100%' onPress={onPress} />
          </View>
        ) : (
          <View style={[BaseStyle.pb10]}>
            <Button text="Gabung Siaran" color="#33C060" backgroundColor="#FFFFFF" borderColor="#33C060" borderRadius={20} width='100%' onPress={onPress} />
          </View>
        )
      }
    </View>
  )
}

export default CardTawafLiveHorizontal

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
})