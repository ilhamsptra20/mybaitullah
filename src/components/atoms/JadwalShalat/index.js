import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import BaseStyle from '../../../assets/style/AppStyle.js';
import { subuh, dzuhur, ashar, maghrib, isya } from '../../../assets';
import useJadwalSholatFetch from '../../../hook/useJadwalSholatFetch/index.js';
import { setItem, getItem, removeItem } from '../../../utils/localStorage.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import BackgroundTimer from 'react-native-background-timer';
import { PermissionsAndroid, Platform } from 'react-native';


const JadwalShalat = () => {
  // Fetch jadwal sholat
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  ); // Default hari ini

  const { jadwalShalat, jadwalShalatError, jadwalShalatLoading } =
    useJadwalSholatFetch({
      date: selectedDate,
    });

  // State untuk menyimpan jadwal sholat dan sholat berikutnya
  const [currentJadwalSholat, setCurrentJadwalSholat] = useState({});
  const [upcomingPrayer, setUpcomingPrayer] = useState({});
  const [nextPrayer, setNextPrayer] = useState({});
  const [banner, setBanner] = useState(subuh);
  const [color, setColor] = useState(BaseStyle.textWhite);
  const [city, setCity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isIsya, setIsIsya] = useState(false);

  const bannerMapping = {
    Subuh: subuh,
    Dzuhur: dzuhur,
    Ashar: ashar,
    Maghrib: maghrib,
    Isya: isya,
  };

  const colorMapping = {
    Subuh: BaseStyle.textWhite,
    Dzuhur: BaseStyle.textBlack,
    Ashar: BaseStyle.textBlack,
    Maghrib: BaseStyle.textWhite,
    Isya: BaseStyle.textWhite,
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izin Lokasi Diperlukan',
          message: 'Aplikasi ini memerlukan akses lokasi untuk menampilkan jadwal sholat.',
          buttonNeutral: 'Nanti',
          buttonNegative: 'Tolak',
          buttonPositive: 'Izinkan',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const calculateNextPrayer = (prayers, date) => {
    const {
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = { hours: 0, minutes: 0, seconds: 0 };
    const now = new Date();
    now.setHours(
      now.getHours() + hours,
      now.getMinutes() + minutes,
      now.getSeconds() + seconds,
    );

    console.log('Waktu Sekarang:', now.toLocaleTimeString('id-ID'));

    const upcoming = prayers
      .map(prayer => {
        if (!prayer.time) return null;
        const [h, m] = prayer.time.split(':');
        const prayerTime = new Date(date);
        prayerTime.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
        return { ...prayer, timeLeft: prayerTime - now };
      })
      .filter(prayer => prayer && prayer.timeLeft > 0)
      .sort((a, b) => a.timeLeft - b.timeLeft);

    setUpcomingPrayer(upcoming);

    const isya = prayers.at(-1); // Ambil elemen terakhir dengan cara yang lebih clean

    if (isya?.time) {
      const [h, m] = isya.time.split(':');
      const isyaTime = new Date(date);
      isyaTime.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
      setIsIsya(isyaTime < now);
    }

    if (upcoming.length > 0) {
      setNextPrayer(upcoming[0]);
      setBanner(bannerMapping[upcoming[0].name]);
      setColor(colorMapping[upcoming[0].name]);
      console.log('⏳ Sholat berikutnya:', banner);
      setTimeLeft(upcoming[0].timeLeft);
    } else if (isIsya) {
      // Jika tidak ada sholat tersisa hari ini dan Isya sudah lewat, ambil jadwal besok
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedTomorrow = tomorrow.toISOString().split('T')[0];

      console.log('⏭️ Tidak ada jadwal sholat tersisa hari ini, mengambil jadwal besok:', formattedTomorrow);
      setSelectedDate(formattedTomorrow);
    }
  };

  useEffect(() => {
    (async () => {
      const permission = await requestLocationPermission();
      if (!permission) return;

      if (isIsya) await removeItem('jadwalSholat');
      const existingData = await getItem('jadwalSholat');
      // const existingData = null;

      if (existingData) {
        console.log('✅ Menggunakan data dari local storage');
        setCurrentJadwalSholat(existingData.timings);
        setCity(existingData.city);
      } else if (jadwalShalat?.timings) {
        console.log('🌍 Fetching data baru karena local storage kosong');

        // Simpan data baru ke AsyncStorage
        await setItem('jadwalSholat', jadwalShalat);

        // Set state berdasarkan data baru
        setCurrentJadwalSholat(jadwalShalat.timings);
        setCity(jadwalShalat
          ? jadwalShalat.city
          : 'Lokasi tidak ditemukan');
      }

      (
        Object.entries(
          existingData?.timings || jadwalShalat?.timings || {}
        ).map(([name, time]) => ({
          name,
          time,
        })),
        selectedDate
      );
    })();
  }, [jadwalShalat, selectedDate]);

  useEffect(() => {
    if (nextPrayer) {
      const timer = BackgroundTimer.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            BackgroundTimer.clearInterval(timer);
            calculateNextPrayer(
              Object.entries(currentJadwalSholat).map(
                ([name, time]) => ({ name, time }),
              ),
              selectedDate,
            );
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => BackgroundTimer.clearInterval(timer);
    }
  }, [nextPrayer, currentJadwalSholat]);

  const formatTimeLeft = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <ImageBackground
      source={banner}
      style={[
        BaseStyle.column,
        BaseStyle.justifyBetween,
        BaseStyle.BgWhite,
        BaseStyle.shadow,
        BaseStyle.p10,
        BaseStyle.radius20,
        { height: 240 },
      ]}
      imageStyle={{ borderRadius: 20 }}>
      <Text
        style={[
          BaseStyle.textSM,
          BaseStyle.MaisonDemi,
          color,
        ]}>
        {jadwalShalatLoading && currentJadwalSholat
          ? 'Sedang Memuat...'
          : city || 'Tidak Diketahui'}
      </Text>
      {nextPrayer && (
        <View>
          <Text
            style={[
              BaseStyle.textXS,
              BaseStyle.MaisonDemi,
              color,
              BaseStyle.textCenter,
              BaseStyle.MaisonBold,
            ]}>
            Waktu Tersisa Menuju Sholat {nextPrayer.name}
          </Text>
          <Text
            style={[
              BaseStyle.MaisonExtendExtra,
              color,
              BaseStyle.textCenter,
              { fontSize: 36 },
            ]}>
            {formatTimeLeft(timeLeft)}
          </Text>
        </View>
      )}
      <View
        style={[
          BaseStyle.row,
          BaseStyle.justifyBetween,
          BaseStyle.alignItemsCenter,
        ]}>
        {!jadwalShalatLoading &&
          Object.keys(currentJadwalSholat).length > 0 ? (
          Object.entries(currentJadwalSholat).map(([name, time]) => (
            <View key={name} style={[BaseStyle.alignItemsCenter]}>
              <Text
                style={[
                  BaseStyle.textXS,
                  BaseStyle.MaisonBook,
                  color,
                  BaseStyle.MaisonBold,
                ]}>
                {name}
              </Text>
              <Text
                style={[
                  BaseStyle.textXS,
                  BaseStyle.MaisonBook,
                  color,
                  BaseStyle.MaisonBold,
                ]}>
                {time}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[BaseStyle.textXS, color, BaseStyle.MaisonBold]}>
            Sedang Memuat....
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default JadwalShalat;

const styles = StyleSheet.create({});
