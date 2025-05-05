import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: 1,
    image: require('../../../../public/banner/banner-02.jpg'),
  },
  {
    id: 2,
    image: require('../../../../public/banner/banner-03.jpg'),
  },
  {
    id: 3,
    image: require('../../../../public/banner/banner-04.jpg'),
  },
  {
    id: 4,
    image: require('../../../../public/banner/banner-05.jpg'),
  },
];

const Carousel = ({pagination=false}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % data.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.slide]}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      {pagination === true ? (
          <View style={styles.pagination}>
            {data.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const dotScale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.4, 0.8],
                extrapolate: 'clamp',
              });
              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              const dotWidth = scrollX.interpolate({
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
                      width: dotWidth,
                      opacity: dotOpacity,
                    },
                  ]}
                />
              );
            })}
          </View>
        ) : (
          <></>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  slide: {
    width: width,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    objectFit: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    // marginVertical: 5
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: '#33C060',
    marginHorizontal: 5,
  },
});

export default Carousel;
