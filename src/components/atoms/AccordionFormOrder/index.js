import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { IconCaretDownGreen } from '../../../assets';

// Aktifkan LayoutAnimation untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionFormOrder = ({ ticketName, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);

    Animated.timing(rotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : contentHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Animasi rotasi ikon caret
  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      {/* Header Accordion */}
      <TouchableOpacity activeOpacity={0.7} style={styles.header} onPress={toggleAccordion}>
        <View style={[styles.item, ({ width: isExpanded ? '80%' : '60%'})]}>
          <Text style={styles.brand} numberOfLines={isExpanded ? 0 : 1}>{ticketName}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <IconCaretDownGreen width={24} height={24} />
        </Animated.View>
      </TouchableOpacity>

      {/* Konten Accordion */}
      <Animated.View style={[styles.animatedContainer, { height: animatedHeight }]}>
        <View
          style={[styles.content, { position: 'absolute', top: 0, left: 0, right: 0}]} // Hidden view
          onLayout={(event) => {
            const height = event.nativeEvent.layout.height;
            if (height !== contentHeight) {
              setContentHeight(height); // Simpan tinggi konten
            }
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(51, 192, 96, .2)',
  },
  logo: {
    width: 40,
    height: 16,
    objectFit: 'cover',
  },
  brand: {
    fontSize: 14,
    fontFamily: 'MaisonNeue-Demi',
    color: '#000000',
    lineHeight: 20
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  content: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default AccordionFormOrder;
