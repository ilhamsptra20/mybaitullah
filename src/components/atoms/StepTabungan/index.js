import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Animated,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const StepTabungan = ({data}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const currentIndex = useRef(0);

  const [containerHeight, setContainerHeight] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % data.length;
      scrollViewRef.current?.scrollTo({
        y: currentIndex.current * containerHeight,
        animated: true,
      });
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [containerHeight]);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  return (
    <View style={styles.wrapper} onLayout={handleLayout}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <View key={item.id} style={[styles.slide]}>
            <View style={styles.iconContainer}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <View style={{marginLeft: 10, width: '78%'}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * containerHeight,
            index * containerHeight,
            (index + 1) * containerHeight,
          ];
          const dotScale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const dotOpacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotHeight = scrollY.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  // transform: [{ scale: dotScale }],
                  height: dotHeight,
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    height: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
    height: 80,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(51, 192, 96, .2)'
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'MaisonNeue-Demi',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#696B6B',
    fontFamily: 'MaisonNeue-Book',
    lineHeight: 13,
  },
  pagination: {
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: '#33C060',
    marginVertical: 5,
  },
});

export default StepTabungan;
