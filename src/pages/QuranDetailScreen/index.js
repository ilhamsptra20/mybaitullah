import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// ASSETS IMAGE
import { IconArrowLeftWhite, IconSearchWhite, IconSearcDarkgreen, IconBookGreen, IconArrowRightGreen } from '../../assets/index.js';

// COMPONENT
import { Button } from "../../components/index.js";

const QuranDetailScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  const route = useRoute();
  const { surah, lastAyah } = route.params;
  const [loading, setLoading] = useState(true);
  const [ayahs, setAyahs] = useState([]);
  const [surahs, setSurahs] = useState([]); // ✅ Simpan daftar surah
  const scrollViewRef = useRef(null);
  const [highlightedAyah, setHighlightedAyah] = useState(null);
  const screenHeight = Dimensions.get("window").height;
  const ayahHeights = useRef({});
  let scrollTimeout = useRef(null);

  // ✅ Fetch daftar surah untuk navigasi yang benar
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://equran.id/api/surat");
        const data = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };

    fetchSurahs();
  }, []);

  useEffect(() => {
    fetchSurahDetails();
  }, [surah]);

  useEffect(() => {
    if (ayahs.length > 0 && lastAyah) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          scrollToAyah(lastAyah);
        });
      }, 1000);
    }
  }, [ayahs]);

  const fetchSurahDetails = async () => {
    try {
      const response = await fetch(`https://equran.id/api/surat/${surah.nomor}`);
      const data = await response.json();
      setAyahs(data.ayat);
    } catch (error) {
      console.error("Error fetching surah details:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToAyah = (ayahNumber) => {
    if (scrollViewRef.current) {
      let offset = 0;
      for (let i = 1; i < ayahNumber; i++) {
        offset += ayahHeights.current[i] || 100;
      }

      scrollViewRef.current.scrollTo({ y: offset, animated: true });
      setHighlightedAyah(ayahNumber);
      setTimeout(() => setHighlightedAyah(null), 3000);
    }
  };

  const saveHistory = async (ayahNumber) => {
    try {
      const historyData = await AsyncStorage.getItem("quran_history");
      let history = historyData ? JSON.parse(historyData) : [];
      history = history.filter((item) => item.nomor !== surah.nomor);
      history.unshift({ nomor: surah.nomor, nama_latin: surah.nama_latin, lastAyah: ayahNumber });

      const newHistory = history.slice(0, 10);
      await AsyncStorage.setItem("quran_history", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    let offset = contentOffset.y;
    let accumulatedHeight = 0;
    let firstVisibleAyah = 1;
    let lastVisibleAyah = 1;

    for (let i = 1; i <= ayahs.length; i++) {
      accumulatedHeight += ayahHeights.current[i] || 100;
      if (accumulatedHeight > offset) {
        firstVisibleAyah = i;
        break;
      }
    }

    accumulatedHeight = 0;
    for (let i = firstVisibleAyah; i <= ayahs.length; i++) {
      accumulatedHeight += ayahHeights.current[i] || 100;
      if (accumulatedHeight > screenHeight) {
        lastVisibleAyah = i;
        break;
      }
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      saveHistory(lastVisibleAyah);
    }, 300);
  };

  // Navigasi ke surat sebelumnya / selanjutnya dengan nama yang benar
  const navigateToSurah = (surahNumber) => {
    const nextSurah = surahs.find((s) => s.nomor === surahNumber);

    if (nextSurah) {
      navigation.replace("QuranDetailScreen", {
        surah: { nomor: surahNumber, nama_latin: nextSurah.nama_latin },
        lastAyah: 1,
      });
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#208D33" style={styles.loader} />
      </View>
    )
  }

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />
      
      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute, 
          BaseStyle.index1, 
          BaseStyle.wFull, navShadow === true ? 
          BaseStyle.navScroll : undefined,
          ({
            paddingTop: StatusBar.currentHeight + 10, 
            paddingHorizontal: 14, 
            paddingBottom: 10, 
            backgroundColor: '#2CA44B', 
            borderBottomLeftRadius: 6, 
            borderBottomRightRadius: 6
            })
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderHeight(height);
          }}
        >
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <View style={[BaseStyle.alignItemsCenter]}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textSM, BaseStyle.textCenter]}>{surah.nama_latin}</Text>
            <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS2, BaseStyle.textCenter]}>{surah.arti}</Text>
          </View>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={{flex: 1, paddingTop: headerHeight}}>
          <View style={[BaseStyle.wrap]}>
          <View style={[BaseStyle.p10, BaseStyle.BgGray100, BaseStyle.mb10]}>
            <Text style={[BaseStyle.MaisonDemi, BaseStyle.textGray300, BaseStyle.textXS1]}>Jumlah Ayat: {ayahs.length}</Text>
          </View>

          {ayahs.map((ayah) => (
            <View
              key={ayah.nomor}
              style={[
                BaseStyle.BgWhite,
                BaseStyle.p10,
                highlightedAyah === Number(ayah.nomor) && BaseStyle.BgLightGreen200,
                ({
                  borderBottomWidth: 1,
                  borderBottomColor: '#EEEEEE'
                })
              ]}
              onLayout={(event) => {
                ayahHeights.current[ayah.nomor] = event.nativeEvent.layout.height;
              }}
            >
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textSM]}>{ayah.nomor}</Text>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL3, BaseStyle.textRight, ({lineHeight: 70})]}>{ayah.ar}</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, BaseStyle.fItalic, BaseStyle.mb10]}>{ayah.tr}</Text>
              <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.lh20]}>{ayah.idn}</Text>
            </View>
          ))}
          </View>
        </View>
      </ScrollView>

      <View style={[BaseStyle.wrap, BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.shadow]}>
        {surah.nomor > 1 && (
          <Button text="Surat Sebelumnya" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} width="48.5%" onPress={() => navigateToSurah(surah.nomor - 1)} />
        )}
        {surah.nomor < 114 && (
          <Button text="Surat Selanjutnya" color="#FFFFFF" backgroundColor="#33C060" borderRadius={20} width="48.5%" onPress={() => navigateToSurah(surah.nomor + 1)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subtitle: { fontSize: 18, fontStyle: "italic", textAlign: "center", marginBottom: 10 },
  ayahContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  ayahNumber: { fontSize: 16, fontWeight: "bold", color: "#4CAF50", textAlign: "left" },
  ayahText: { fontSize: 22, textAlign: "right", marginVertical: 5 },
  latinText: { fontSize: 16, fontStyle: "italic", color: "#555", marginBottom: 5 },
  translationText: { fontSize: 16, color: "#333" },
  highlightedAyah: { backgroundColor: "rgba(51, 192, 96, 0.2)" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { flex: 1, padding: 12, backgroundColor: "#4CAF50", marginHorizontal: 5, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default QuranDetailScreen;
