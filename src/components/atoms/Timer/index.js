import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';

// STYLE
import BaseStyle from '../../../assets/style/AppStyle.js'
import { maghrib } from '../../../assets/index.js';

const Timer = ({isIsya}) => {
    // State untuk menyimpan jadwal sholat
    const [jadwalSholat, setJadwalSholat] = useState([]);
    // State untuk menyimpan jadwal sholat
    const [jadwalSholatContent, setJadwalSholatContent] = useState([]);
    // State untuk menyimpan waktu sholat terdekat
    const [nearestPrayer, setNearestPrayer] = useState(null);
    // State untuk menyimpan waktu tersisa menuju sholat terdekat
    const [timeLeft, setTimeLeft] = useState(0);

    // Fungsi untuk mengambil jadwal sholat dari API
    const fetchJadwalSholat = async (date) => {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=-6.2389657&longitude=106.8678279&method=2`);
            const data = await response.json();
            const timings = data.data.timings;
            setJadwalSholat([
                // { "imsak": timings.Imsak },
                { "subuh": timings.Fajr },
                { "dzuhur": timings.Dhuhr },
                { "ashar": timings.Asr },
                { "maghrib": timings.Maghrib },
                { "isya": timings.Isha }
            ]);
            setJadwalSholatContent([
                // { name: "Imsak", time: timings.Imsak },
                { name: "Subuh", time: timings.Fajr },
                { name: "Dzuhur", time: timings.Dhuhr },
                { name: "Ashar", time: timings.Asr },
                { name: "Maghrib", time: timings.Maghrib },
                { name: "Isya", time: timings.Isha }
            ]);
        } catch (error) {
            console.error('Error fetching jadwal sholat:', error);
        }
    };

    // Fungsi untuk menghitung waktu tersisa menuju sholat terdekat
    const calculateTimeLeft = () => {
        const now = new Date();
        const times = jadwalSholat.map(prayer => {
            const [name, time] = Object.entries(prayer)[0];
            const [hours, minutes] = time.split(':');
            const prayerTime = new Date();
            prayerTime.setHours(hours, minutes, 0, 0);
            const diff = prayerTime - now;
            return { name, timeLeft: diff > 0 ? diff : Infinity };
        });

        // Menentukan waktu sholat terdekat
        const nearest = times.reduce((prev, curr) => (prev.timeLeft < curr.timeLeft ? prev : curr));
        setNearestPrayer(nearest.name);
        setTimeLeft(nearest.timeLeft);
    };

    // Fungsi untuk mereset jadwal sholat jika waktu sekarang sudah melebihi isya
    const resetSchedule = () => {
        const now = new Date();
        const [hours, minutes] = jadwalSholat[jadwalSholat.length - 1].isya.split(':');
        const isyaTime = new Date();
        isyaTime.setHours(hours, minutes, 0, 0);
        if (now > isyaTime) {
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            fetchJadwalSholat(formattedDate);
        }
    };

    // Fungsi untuk memformat waktu tersisa menjadi jam:menit:detik
    const formatTimeLeft = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Menggunakan useEffect untuk mengambil jadwal sholat dari API saat komponen pertama kali dimuat
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        fetchJadwalSholat(formattedDate);
    }, []);

    // Menggunakan useEffect untuk menghitung waktu tersisa dan mereset jadwal setiap detik
    useEffect(() => {
        if (jadwalSholat.length > 0) {
            calculateTimeLeft();
            const timer = setInterval(() => {
                calculateTimeLeft();
                resetSchedule();
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [jadwalSholat]);

    return (
        <ImageBackground source={maghrib} style={[BaseStyle.column, BaseStyle.justifyBetween, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.p10, BaseStyle.radius20, ({height: 240})]} imageStyle={{ borderRadius: 20}}>
            <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Jakarta</Text>
            {nearestPrayer && (
                <View>
                    <Text style={[BaseStyle.textXS, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textCenter]}>Waktu Tersisa Menuju shalat {nearestPrayer}</Text>
                    <Text style={[BaseStyle.MaisonExtendExtra, BaseStyle.textBlack, BaseStyle.textCenter, ({fontSize: 36})]}>{formatTimeLeft(timeLeft)}</Text>
                </View>
            )}
            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                {jadwalSholatContent.map((item, y) => {
                    return (
                        <View key={y} style={[BaseStyle.alignItemsCenter]}>
                            <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack]}>{item.name}</Text>
                            <Text style={[BaseStyle.textXS, BaseStyle.MaisonBook, BaseStyle.textBlack]}>{item.time}</Text>
                        </View>
                    )
                })}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({});

export default Timer;
