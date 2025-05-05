import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// ICON
import { IconCaretLeftGreen, IconCaretRightGreen, IconCopyGreen, IconDownloadGreen, IconDownloadWhite } from '../../../assets';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'

const SwapContentQrCode = ({data, loadingQrCode}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const qrSize = Math.min(width, height) * 0.6;

  const [index, setIndex] = useState(0);
  const translateX = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50 && index < data.length - 1) {
        handleNext();
      } else if (gestureState.dx > 50 && index > 0) {
        handlePrev();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleNext = () => {
    Animated.timing(translateX, {
      toValue: -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(0);
      setIndex((prev) => prev + 1);
    });
  };

  const handlePrev = () => {
    Animated.timing(translateX, {
      toValue: width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(0);
      setIndex((prev) => prev - 1);
    });
  };

  return (
    <View style={[BaseStyle.relative, BaseStyle.wFull]}>
      <View {...panResponder.panHandlers} style={[BaseStyle.wFull]}>
        <Animated.View style={[BaseStyle.relative, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radius30, BaseStyle.wFull, BaseStyle.p20, ({height: height * 0.68, transform: [{ translateX }]})]}> 
          {!loadingQrCode ? (
                <>
                  <View style={[BaseStyle.justifyContentLeft, BaseStyle.wFull]}>
                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius8, BaseStyle.BgLightGreen500, BaseStyle.mr10]}>
                          <IconDownloadWhite width={18} height={18} />
                        </View>
                        <Text style={[BaseStyle.MaisonDemi, BaseStyle.textLightGreen500, BaseStyle.textMD, BaseStyle.index1]}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[BaseStyle.relative]}>
                    <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgLightGreen500, ({left: -5, top: -5})]} />
                    <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgLightGreen500, ({right: -5, top: -5})]} />
                    <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgLightGreen500, ({left: -5, bottom: -5})]} />
                    <View style={[BaseStyle.absolute, BaseStyle.w50, BaseStyle.h50, BaseStyle.BgLightGreen500, ({right: -5, bottom: -5})]} />
                    <View style={[BaseStyle.BgWhite, BaseStyle.p5]}>
                      <QRCode
                        value={data[index].code}
                        size={qrSize}
                        color='#506888'
                        backgroundColor='white'
                      />
                    </View>
                  </View>
                  <View style={[BaseStyle.wFull]}>
                      <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.mb10]}>Kode QR Anda</Text>
                      <View style={[BaseStyle.relative]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radius4, BaseStyle.h50, BaseStyle.ph20]}>
                            <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.mr50]}>{data[index].code}</Text>
                            <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w50, BaseStyle.h50, BaseStyle.radius4, BaseStyle.BgWhite, BaseStyle.shadow, ({right: 0})]}>
                                <IconCopyGreen width={24} height={24} />
                            </TouchableOpacity>
                        </View>
                      </View>
                  </View>
                </>
            ) : (
                <></>
            )
          }
        </Animated.View>
      </View>

      {index > 0 && (
        <TouchableOpacity style={[styles.buttonLeft, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.borderLightGreen500, BaseStyle.BgWhite]} onPress={handlePrev}>
          <IconCaretLeftGreen width={18} height={18} />
        </TouchableOpacity>
      )}
      
      {index < data.length - 1 && (
        <TouchableOpacity style={[styles.buttonRight, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.borderLightGreen500, BaseStyle.BgWhite]} onPress={handleNext}>
          <IconCaretRightGreen width={18} height={18} />
        </TouchableOpacity>
      )}

      <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textMD, BaseStyle.textCenter, BaseStyle.mt20]}>Tiket {`${index + 1} / ${data.length}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  counterText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  buttonLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
  buttonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
});

export default SwapContentQrCode;
