import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Image,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Data Dinamis (dapat diganti sesuai kebutuhan)
const dynamicData = [
  {
    id: 1,
    icon: require('../../../assets/icon/icon-alquran.png'),
    title: 'Al-Quran',
    navigation: ''
  },
  {
    id: 2,
    icon: require('../../../assets/icon/icon-doa.png'),
    title: 'Doa Baitullah',
    navigation: ''
  },
  {
    id: 3,
    icon: require('../../../assets/icon/icon-kiblat.png'),
    title: 'Kiblat',
    navigation: ''
  },
  {
    id: 4,
    icon: require('../../../assets/icon/icon-alquran.png'),
    title: 'Tiket',
    navigation: ''
  },
  {
    id: 5,
    icon: require('../../../assets/icon/icon-alquran.png'),
    title: 'Cerita Baitullah',
    navigation: ''
  },
];

// Jumlah item per slide
const ITEMS_PER_SLIDE = 4;
const SLIDE_WIDTH = SCREEN_WIDTH;

export default function Menu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Membagi data menjadi slide
  const slides = Array.from(
    { length: Math.ceil(dynamicData.length / ITEMS_PER_SLIDE) },
    (_, index) =>
      dynamicData.slice(index * ITEMS_PER_SLIDE, (index + 1) * ITEMS_PER_SLIDE)
  );

  // Menghitung posisi slide saat scroll
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SLIDE_WIDTH);
    setCurrentIndex(index);
  };

  // Render satu slide
  const renderSlide = ({ item }) => {
    const isLessThanThree = item.length < ITEMS_PER_SLIDE;

    return (
      <View
        style={[
          styles.slide,
          isLessThanThree && { justifyContent: "flex-start", paddingLeft: 14 },
        ]}
      >
        {item.map(({ id, icon, title, navigation }) => (
          <View
            key={id}
            style={[
              styles.itemContainer,
              isLessThanThree && {marginRight: 15}
            ]}
          >
            <View style={styles.item}>
              <Image source={icon} style={styles.icon} />
            </View>
            <Text style={styles.itemText}>{title}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render Pagination
  const renderPagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderSlide}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
      />
      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width: SLIDE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly", // Default
  },
  itemContainer: {
    position: 'relative',
    width: SLIDE_WIDTH / ITEMS_PER_SLIDE - 20,
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10, // Menambahkan margin antar item
  },
  item: {
    width: '76%',
    aspectRatio: 1/1,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 192, 96, .2)',
  },
  icon: {
    width: 36,
    height: 36,
  },
  itemText: {
    color: "#000000",
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#D9D9D9",
  },
  dot: {
    width: 10,
    height: 4,
    backgroundColor: "#D9D9D9",
  },
  activeDot: {
    backgroundColor: "#33C060",
    width: 20,
  },
});
