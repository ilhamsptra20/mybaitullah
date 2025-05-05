import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, PanResponder, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// ICON
import { IconCaretLeftGreen, IconCaretRightGreen, IconCopyGreen, IconDownloadGreen, IconDownloadWhite } from '../../../assets';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'

const height = Dimensions.get("window");

const SwapContentTawafLiveStep = ({data, loadingQrCode}) => {
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
        <Animated.View style={{transform: [{ translateX }]}}> 
          {data.map((item, y) => {
            return (
              <View key={y[index]} style={[BaseStyle.p20, BaseStyle.borderGray100, BaseStyle.radius10,]}>
                <Image source={item.image} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape, BaseStyle.radius10]} />
                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM, BaseStyle.textCenter, BaseStyle.pv20]}>{item.title}</Text>
                <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.textCenter]}>{item.description}</Text>
              </View>
            )
          })}
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

export default SwapContentTawafLiveStep;
