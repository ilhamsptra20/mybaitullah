import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BackHandler, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, StatusBar, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js';

// ASSETS
import { IconArrowLeftWhite, IconSearchWhite, IconSearcDarkgreen, IconBookGreen, IconArrowRightGreen } from '../../assets/index.js';

// COMPONENT
import { TextInputAlquranSearch } from "../../components/index.js";
import SurahItem from "../../components/atoms/SurahItem/index.js";
import HistoryCard from "../../components/atoms/HistoryCard/index.js";

const QuranListScreen = ({ navigation }) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [navShadow, setNavShadow] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch surah
  const fetchSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://equran.id/api/surat");
      const text = await response.text();
      const data = JSON.parse(text);
      setSurahs(data);
      setFilteredSurahs(data);
    } catch (err) {
      setError("Gagal mengambil data dari API.");
      console.error("Error fetching surahs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load history
  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem("quran_history");
      if (historyData) {
        const parsedHistory = JSON.parse(historyData);
        if (parsedHistory.length > 0) {
          setHistory(parsedHistory[0]);
        }
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  // useFocusEffect
  useFocusEffect(
    useCallback(() => {
      fetchSurahs();
      loadHistory();
    }, [])
  );  

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = search
        ? surahs.filter((s) => s.nama_latin.toLowerCase().includes(search.toLowerCase()))
        : surahs;
      setFilteredSurahs(filtered);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, surahs]);

  const openSurah = (surah, lastAyah = 1) => {
    navigation.navigate("QuranDetailScreen", { surah, lastAyah });
  };

  const renderSurahList = useMemo(() => {
    return filteredSurahs.map((item) => (
      <SurahItem key={item.nomor} item={item} openSurah={openSurah} />
    ));
  }, [filteredSurahs]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#208D33" />
      </View>
    );
  }

  return (
    <View style={BaseStyle.container}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />
      
      {/* HEADER */}
      <View
        style={[
          BaseStyle.absolute,
          BaseStyle.index1,
          BaseStyle.wFull,
          navShadow ? BaseStyle.navScroll : undefined,
          {
            paddingTop: StatusBar.currentHeight + 10,
            paddingHorizontal: 14,
            paddingBottom: 10,
            backgroundColor: '#2CA44B',
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
          },
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
      >
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.replace("MainApp", {screen: "Home"})}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Alquran</Text>
          <View style={{ width: 20 }} />
        </View>
        <View style={[BaseStyle.relative, BaseStyle.mt10]}>
          <TextInputAlquranSearch
            placeholder="Cari Surat"
            placeholderColor="#208D33"
            icon={IconSearcDarkgreen}
            width="100%"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <View style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.rectangle, BaseStyle.BgDarkGreen500, ({width: 42, top: 0, right: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12})]}>
            <IconSearchWhite width={20} height={20} />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: headerHeight }}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10, paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => {
              const offset = e.nativeEvent.contentOffset.y;
              setNavShadow(offset >= 1);
            }}
            scrollEventThrottle={16}
          >
            {history && (
              <HistoryCard history={history} openSurah={openSurah} />
            )}

            {renderSurahList}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: { textAlign: "center", color: "red", marginVertical: 20 },
});

export default QuranListScreen;
