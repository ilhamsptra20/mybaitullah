import React, { useEffect, useState, useRef } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet, Alert, Modal, Animated, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { ClientRoleType, createAgoraRtcEngine, ChannelProfileType, } from 'react-native-agora';
import Axios from 'axios';
import { formatDate } from '../../utils/formatDate.js';
// import ReverbService from '../../service/ReverbService.js';

// COMPONENT
import { Button } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// ICON
import { IconArrowLeftWhite, IconClockWhite, IconUserWhite, IconHandGreen, IconMicActive, IconMicNonactive, IconPaperPlanWhite, IconUserGrey, IconXMarkWhite, IconClockGreen02, IlustrationPattern6, IconUserGreen } from '../../assets';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js';

// API
import userData from '../../hook/user/userFetch.js'
import useTawafChannelJoin from '../../hook/useTawafChannelJoin.js';
import useTawafChannelLeave from '../../hook/useTawafChannelLeave.js';


const height = Dimensions.get("window");

const TawafRoom = ({ navigation, route }) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    // API
    const { idRoom, role, channelName, travelName, imageUser, hostName, periodDate, periodTime, channelCode } = route.params; // role = "host" atau "audience"

    const APP_ID = 'e78924e04b7b4088be505a4f44f7a939';
    const APP_CERTIFICATE = '376c79d61fb64d1d9a9772b7c450e7fd';
    const CHANNEL_NAME = channelCode;

    // USER DATA
    const { user, loadingUser, errorUser } = userData();

    // NAV SHADOW
    const [navShadow, setNavShadow] = useState(false);

    // BOTTOM SHEET
    const [isVisibleJoinChannel, setIsVisibleJoinChannel] = useState(false);
    const [isVisibleLeaveChannel, setIsVisibleLeaveChannel] = useState(false);

    const openBottomSheetJoinChannel = () => setIsVisibleJoinChannel(true);
    const closeBottomSheetJoinChannel = () => setIsVisibleJoinChannel(false);

    const openBottomSheetLeaveChannel = () => setIsVisibleLeaveChannel(true);
    const closeBottomSheetLeaveChannel = () => setIsVisibleLeaveChannel(false);

    // MENU
    const [menu, setMenu] = useState(0);

    // AGORA AND ANIMATION
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef(null);
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]); // State untuk menyimpan user yang aktif
    const [volume, setVolume] = useState(0);

    // Animasi Waveform (5 Bar)
    const volumeLevels = useRef(
        Array(5).fill(null).map(() => new Animated.Value(6))
    ).current;

    const timestamp = new Date().getTime();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const uid = parseInt(randomNum.toString() + timestamp.toString());

    const agoraEngineRef = useRef(null);

    // SCROLLVIEW PARTICIPANT WHEN JOIN
    const scrollViewRef = useRef(null);

    // KOMENTAR
    const [comment, setComment] = useState('');
    const handleSendComment = () => {
        if (comment.trim() !== '') {
            // console.log('Komentar Dikirim:', comment);
            setComment(''); // Reset input setelah komentar dikirim
        }
    };

    // AUDIENCE JOIN
    const [audienceSum, setAudienceSum] = useState([]);
    const [audienceJoin, setAudienceJoin] = useState([]);
    const [audienceLeave, setAudienceLeave] = useState([]);

    // MUTE AUDIO
    const [isMuted, setIsMuted] = useState(false);
    const [hostMuted, setHostMuted] = useState(false);
    const [hostId, setHostId] = useState(null);

    const toggleMute = async () => {
        if (agoraEngineRef.current) {
            await agoraEngineRef.current.muteLocalAudioStream(!isMuted);
            setIsMuted(!isMuted);
        }

        // Jika user adalah host, broadcast mute status ke semua peserta
        if (role === 'host') {
            const muteStatus = JSON.stringify({ uid, isMuted: !isMuted });
            agoraEngineRef.current.sendStreamMessage(0, muteStatus);
        }
    };

    // TIMER
    const [timeLeft, setTimeLeft] = useState({});
    const [hasWarnedFiveMinutes, setHasWarnedFiveMinutes] = useState(false);
    const [hasWarnedOneMinute, setHasWarnedOneMinute] = useState(false);

    // Menghitung waktu tersisa
    const calculateTimeLeft = () => {
        const now = new Date();
        const formattedDate = periodDate;
        const targetDateTime = new Date(`${formattedDate}T${periodTime}:00`);

        const difference = targetDateTime - now;

        return difference > 0
            ? {
                totalSeconds: Math.floor(difference / 1000),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
            : { totalSeconds: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    useEffect(() => {
        getToken();
        setupVideoSDKEngine();

        setTimeLeft(calculateTimeLeft()); // Set waktu awal
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.totalSeconds === 300 && !hasWarnedFiveMinutes) {
                setHasWarnedFiveMinutes(true);
                setTimeout(() => setHasWarnedFiveMinutes(false), 10000);
            }
            if (newTimeLeft.totalSeconds === 60 && !hasWarnedOneMinute) {
                setHasWarnedOneMinute(true);
                setTimeout(() => setHasWarnedOneMinute(false), 10000);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);


    // **Gunakan useEffect untuk memantau perubahan audienceSum**
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        }, 100); // Delay kecil untuk memberi waktu layout update

        return () => clearTimeout(timeout);
    }, [audienceSum]); // Dependensi ini memastikan scroll otomatis saat audienceSum berubah


    const getToken = async () => {
        try {
            setIsLoading(true);
            const res = await Axios.get(`https://baitullah.co.id/agora_master/tools/DynamicKey/AgoraDynamicKey/php/sample/RtcTokenBuilderSample.php?app_id=${APP_ID}&app_certificate=${APP_CERTIFICATE}&channel_name=${CHANNEL_NAME}`);

            if (res.data && res.data.init_token) {
                setToken(res.data.init_token);
                console.log("Token Diterima:", res.data.init_token);
            } else {
                console.log("Token tidak valid:", res.data);
            }
        } catch (error) {
            console.error('Gagal mendapatkan token:', error);

            if (error.message.includes("Network Error") && retryCount < 5) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`Retrying in ${delay / 1000} seconds...`);
                setTimeout(() => getToken(retryCount + 1), delay);
            } else if (retryCount >= 5) {
                console.log("Gagal mendapatkan token setelah beberapa kali percobaan. Reloading...");
                window.location.reload();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const setupVideoSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') {
                await requestPermissions();
            }

            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onAudioVolumeIndication: (_speakers, speakerInfos) => {
                    if (speakerInfos && speakerInfos.length > 0) {
                        const newVolume = Math.min(1, speakerInfos[0].volume / 255);
                        // console.log("Detected Volume:", newVolume);

                        // Gunakan fungsi dalam setState agar mendapatkan state terbaru
                        setVolume((prev) => {
                            animateWave(newVolume);
                            return newVolume;
                        });
                    }
                },
                onJoinChannelSuccess: () => {
                    // Alert.alert('Berhasil Join ke Channel: ' + CHANNEL_NAME);
                    setIsJoined(true);
                    setActiveUsers(prevUsers => [...prevUsers, uid]); // Tambahkan user sendiri ke daftar
                },
                onUserJoined: (_connection, Uid) => {
                    console.log(`User ${Uid} bergabung`);
                    setRemoteUid(Uid);

                    // Tambahkan user ke daftar aktif
                    setActiveUsers(prevUsers => [...prevUsers, Uid]);

                    // Tambahkan user ke daftar audience yang join
                    const newUser = {
                        id: Uid,
                        name: `User ${Uid}`, // Gantilah dengan nama user asli jika tersedia
                        image: null, // Atur image jika tersedia
                        status: 'join'
                    };

                    setAudienceJoin(prev => [...prev, newUser]);
                    setAudienceLeave(prev => prev.filter(aud => aud.id !== Uid)); // Hapus dari leave jika sebelumnya keluar
                    setAudienceSum(prev => [...prev, newUser]); // Simpan event secara historis
                },
                onUserOffline: (_connection, Uid) => {
                    console.log(`User ${Uid} meninggalkan channel`);
                    setRemoteUid(null);
                    setActiveUsers(prevUsers => prevUsers.filter(user => user !== Uid));

                    // Pindahkan user dari join ke leave
                    const leavingUser = {
                        id: Uid,
                        name: `User ${Uid}`,
                        image: null,
                        status: 'leave'
                    };

                    setAudienceJoin(prev => prev.filter(aud => aud.id !== Uid)); // Hapus dari join
                    setAudienceLeave(prev => [...prev, leavingUser]); // Tambahkan ke leave
                    setAudienceSum(prev => [...prev, leavingUser]); // Simpan event secara historis
                },
                onStreamMessage: (connection, userId, streamId, message) => {
                    try {
                        const data = JSON.parse(message);
                        if (data && typeof data.isMuted === 'boolean') {
                            // Jika yang mengirim pesan adalah host, update status mute host
                            if (data.uid === hostId) {
                                setHostMuted(data.isMuted);
                            }
                        }
                    } catch (error) {
                        console.error('Gagal membaca pesan stream:', error);
                    }
                }
            });

            agoraEngine.initialize({
                appId: APP_ID,
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            });

            agoraEngine.setClientRole(
                role === 'host'
                    ? ClientRoleType.ClientRoleBroadcaster
                    : ClientRoleType.ClientRoleAudience
            );

            agoraEngine.enableAudio(); // Pastikan audio diaktifkan
            agoraEngine.enableAudioVolumeIndication(200, 13, false); // Kirim event volume setiap 200ms

            console.log("Agora SDK berhasil diinisialisasi.");
        } catch (error) {
            console.error("Error saat inisialisasi Agora:", error);
        }
    };

    const requestPermissions = async () => {
        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        } catch (error) {
            console.error("Gagal mendapatkan izin:", error);
        }
    };

    const startTimer = () => {
        timerRef.current = BackgroundTimer.setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            BackgroundTimer.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Join / Leave Channel
    const { joinChannel, loadingJoin, errorJoin } = useTawafChannelJoin();
    const { leaveChannel, loadingLeave, errorLeave } = useTawafChannelLeave();

    const join = async () => {
        if (isJoined) {
            Alert.alert('Menunggu Ustad Memulai Siaran');
            return;
        }

        if (!token) {
            Alert.alert("Token belum tersedia. Mohon coba lagi.");
            return;
        }

        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileLiveBroadcasting
            );

            const clientRole = role === 'host'
                ? ClientRoleType.ClientRoleBroadcaster
                : ClientRoleType.ClientRoleAudience;

            agoraEngineRef.current?.joinChannel(token, CHANNEL_NAME, uid, {
                clientRoleType: clientRole,
            });

            if (clientRole === ClientRoleType.ClientRoleAudience) {
                agoraEngineRef.current?.enableAudio();
            }

            startTimer();
            console.log(`Bergabung ke channel sebagai ${role}`);
            setIsJoined(true);

            if (!user) return; // Pastikan user tersedia sebelum melanjutkan
            const newUser = {
                id: user.id,
                name: user.userName,
                image: user.avatar,
                status: 'join'
            };

            // Pindahkan user dari audienceLeave ke audienceJoin jika sebelumnya keluar
            setAudienceLeave((prev) => prev.filter((aud) => aud.id !== newUser.id));
            setAudienceJoin((prev) => [...prev, newUser]);

            // **Simpan ke audienceSum tanpa cek duplikasi agar selalu tercatat peristiwa terbaru**
            setAudienceSum((prev) => [...prev, newUser]);
        } catch (error) {
            console.error('Gagal bergabung ke channel:', error);
        }
    };

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(null);
            setIsJoined(false);
            setActiveUsers([]); // Kosongkan daftar user saat keluar
            // Alert.alert('Anda meninggalkan channel');
            stopTimer();

            if (!user) return; // Pastikan user tersedia sebelum melanjutkan
            const leavingUser = {
                id: user.id,
                name: user.userName,
                image: user.avatar,
                status: 'leave'
            };

            // **Kurangi user dari audienceJoin dan pindahkan ke audienceLeave**
            setAudienceJoin((prev) => prev.filter((aud) => aud.id !== leavingUser.id));
            setAudienceLeave((prev) => [...prev, leavingUser]);

            // **Tambahkan ke audienceSum tanpa cek duplikasi untuk mencatat peristiwa terbaru**
            setAudienceSum((prev) => [...prev, leavingUser]);
        } catch (error) {
            console.error("Gagal meninggalkan channel:", error);
        }
    };

    // WAVE ANIMATION COMPONENT
    const animateWave = (newVolume) => {
        volumeLevels.forEach((level, index) => {
            Animated.spring(level, {
                toValue: 10 + newVolume * (80 + index * 10), // Skala tinggi bar lebih smooth
                stiffness: 150, // Kekakuan spring untuk transisi yang lebih natural
                damping: 15, // Mengurangi osilasi berlebihan
                mass: 1,
                useNativeDriver: false,
            }).start();
        });
    };

    return (
        <View style={[BaseStyle.container, BaseStyle.BgBlack]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={{ flex: 1 }} >
                <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

                {/* HEADER */}
                <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, BaseStyle.BgTrasnparent, ({ paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 })]}>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
                        <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
                            <IconArrowLeftWhite width={20} height={20} />
                        </TouchableOpacity>
                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Tawaf Live</Text>
                        <View style={[BaseStyle.w20, BaseStyle.w20]} />
                    </View>
                </View>

                {/* <LinearGradient colors={['#33C060', '#2FD072']} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.banner, ({marginTop: StatusBar.currentHeight + 44})]} /> */}
                <Image source={IlustrationPattern6} style={[BaseStyle.wFull, BaseStyle.hAuto, BaseStyle.landscape, ({ marginTop: StatusBar.currentHeight, paddingBottom: 44 })]} />
                <View style={[BaseStyle.relative, BaseStyle.wrap, BaseStyle.BgWhite, ({ paddingTop: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, top: "-9.6%", zIndex: 1 })]}>
                    <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter]}>
                        <View style={[BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.borderLightGreen500, BaseStyle.radius20, BaseStyle.h30, BaseStyle.ph10]}>
                            <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                                <IconClockGreen02 width={18} height={18} />
                                {/* <Text style={[BaseStyle.MaisonBook, BaseStyle.textWhite, BaseStyle.textXS, BaseStyle.ml5]}>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</Text> */}
                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS, BaseStyle.ml5]}>{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</Text>
                            </View>
                        </View>
                        <View style={[BaseStyle.row, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.borderLightGreen500, BaseStyle.radius20, BaseStyle.ph10, BaseStyle.h30]}>
                            <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textDarkGreen500, BaseStyle.textXS]}>{audienceJoin.length}</Text>
                                <IconUserGreen width={18} height={18} />
                            </View>
                        </View>
                    </View>

                    <View style={[BaseStyle.absolute, ({ top: 0, left: "50%", transform: [{ translateX: -54 }, { translateY: -70 }], })]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.BgWhite, BaseStyle.shadow, BaseStyle.radiusCircle, BaseStyle.p10, ({ width: 140, height: 140 })]}>
                            {imageUser === null || imageUser === undefined || imageUser === "" || imageUser === 0
                                ? <IconUserGrey width={100} height={100} />
                                : <Image source={imageUser} style={[BaseStyle.w120, BaseStyle.h120, ({ borderRadius: 120 })]} />
                            }
                        </View>
                    </View>

                    <View style={[BaseStyle.absolute, ({ top: "4%", left: "50%", transform: [{ translateX: 50 }, { translateY: 0 }], })]}>
                        <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radiusCircle, BaseStyle.BgWhite, BaseStyle.shadow]}>
                            {isJoined ? (
                                <IconMicNonactive width={16} height={16} />
                            ) : (
                                <>
                                    {role === 'audience' && hostMuted && (
                                        <IconMicActive width={16} height={16} />
                                    )}
                                </>
                            )
                            }
                        </View>
                    </View>

                    <View style={[BaseStyle.justifyBetween, BaseStyle.pt40, BaseStyle.pb10, ({ height: height * 0.776 })]}>
                        {/* {role === 'audience' && hostMuted && (
                            <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginBottom: 10 }}>
                                <Text style={{ color: 'black', textAlign: 'center' }}>Host telah mematikan mikrofon</Text>
                            </View>
                        )} */}

                        <View style={[BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                            <View
                                style={[
                                    BaseStyle.row,
                                    BaseStyle.justifyCenter,
                                    BaseStyle.alignItemsCenter,
                                    BaseStyle.hAuto,
                                    BaseStyle.rectangle,
                                    // BaseStyle.radiusCircle,
                                    // BaseStyle.BgWhite,
                                    // BaseStyle.shadow,
                                    ({ width: '16%' })]
                                }
                                onLayout={(event) => {
                                    const { height } = event.nativeEvent.layout;
                                    setMenu(height);
                                }}
                            >
                                {volumeLevels.map((level, index) => {
                                    const animatedHeight = level.interpolate({
                                        inputRange: [6, 26],
                                        outputRange: [6, 26],
                                        extrapolate: "clamp",
                                    });
                                    return (
                                        <Animated.View key={index} style={{ width: 6, marginHorizontal: 2, borderRadius: 6, height: animatedHeight, backgroundColor: `rgba(51, 192, 96, ${1 - index * 0.15})`, }} />
                                    );
                                })}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            {role === 'audience' ? (
                                <View>
                                    <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textMD, BaseStyle.textCenter, BaseStyle.mb20]}>Pembicara: {hostName}</Text>
                                    {/* <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textMD, BaseStyle.textCenter, BaseStyle.mb20]}>{isJoined ? 'Siaran sedang berlangsung' : 'Siaran belum dimulai'}</Text> */}

                                    {/* {remoteUid ? (
                                                <Text>User ID: {remoteUid} joined</Text>
                                            ) : (
                                                <Text>Waiting for users...</Text>
                                            )
                                        } */}
                                </View>
                            ) : (
                                <></>
                            )}

                            {/* <View>
                                Tampilkan daftar user yang sedang aktif
                                <Text style={{ fontSize: 20, marginTop: 20 }}>User Aktif:</Text>
                                {activeUsers.length > 0 ? (
                                    activeUsers.map((user, index) => (
                                        <Text key={index} style={{ fontSize: 18 }}>{user}</Text>
                                    ))
                                ) : (
                                    <Text style={{ fontSize: 18 }}>Belum ada user yang aktif</Text>
                                )}
                            </View> */}

                            <View style={[BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100, BaseStyle.mb20]}>
                                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Channel</Text>
                                    </View>
                                    <View>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textLightGreen500, BaseStyle.textXS1, BaseStyle.textRight]}>{channelName}</Text>
                                    </View>
                                </View>
                                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv5, ({ height: 1 })]} />
                                {travelName !== null && travelName !== undefined && travelName !== "" && travelName !== 0 ? (
                                    <>
                                        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                                            <View style={{ width: '40%' }}>
                                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Nama Travel</Text>
                                            </View>
                                            <View>
                                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{travelName}</Text>
                                            </View>
                                        </View>
                                        <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv5, ({ height: 1 })]} />
                                    </>
                                ) : (
                                    <></>
                                )
                                }
                                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Tanggal Berakhir</Text>
                                    </View>
                                    <View>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{formatDate(periodDate)}</Text>
                                    </View>
                                </View>
                                <View style={[BaseStyle.wFull, BaseStyle.BgGray100, BaseStyle.mv5, ({ height: 1 })]} />
                                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.flexWrap]}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textGray300, BaseStyle.textXS1]}>Jam Berakhir</Text>
                                    </View>
                                    <View>
                                        <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textRight]}>{periodTime}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textMD, BaseStyle.mb10]}>Peserta</Text>
                            <View style={[BaseStyle.wFull, BaseStyle.mb20, BaseStyle.p10, BaseStyle.radius20, BaseStyle.borderGray100, ({ flex: 1, paddingBottom: 0 })]}>
                                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={true} indicatorStyle="#33C060" edgeEffectColor={Platform.OS === 'android' ? '#33C060' : undefined} scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                    <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.lh18, BaseStyle.mb10]}>Assalamu’alaikum, selamat datang di Tawaf Live! Semoga sesi ini membawa manfaat untuk kita semua.</Text>
                                    {audienceSum.map((item, index) => (
                                        <View key={index} style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.p5, BaseStyle.radius20, BaseStyle.mb10, BaseStyle.borderGray100, ({ backgroundColor: 'rgba(238,238,238,0.4)' })]}>
                                            {item.image === null || item.image === undefined || item.image === "" || item.image === 0 ? (
                                                <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.radiusCircle, BaseStyle.BgWhite, BaseStyle.mr5]}>
                                                    <IconHandGreen width={16} height={16} />
                                                </View>
                                            ) : <Image source={item.image} style={[BaseStyle.w30, BaseStyle.h30, BaseStyle.radius30, BaseStyle.mr10]} />}
                                            <View style={[BaseStyle.row, BaseStyle.alignItemsCenter]}>
                                                <Text style={[BaseStyle.MaisonBook, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textCenter, BaseStyle.mr5]}>{item.name}</Text>
                                                <Text style={[BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textCenter, BaseStyle.mr5]}>{item.status === 'join' ? 'Bergabung' : 'Meninggalkan Channel'}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                                {/* INPUT KOMENTAR */}
                                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                                        <View style={[BaseStyle.row, BaseStyle.alignItemsCenter, BaseStyle.borderGray100, BaseStyle.h50, BaseStyle.radius50, BaseStyle.pl10, BaseStyle.mb10, { paddingRight: 75 }]}>
                                            <TextInput
                                                style={[BaseStyle.textBlack, { flex: 1 }]}
                                                placeholder="Ketik komentar..."
                                                placeholderTextColor="#888"
                                                value={comment}
                                                onChangeText={setComment}
                                            />
                                            <Text style={[BaseStyle.absolute, BaseStyle.MaisonDemi, BaseStyle.textBlack, BaseStyle.textXS1, BaseStyle.textCenter, { right: 50 }]}>/50</Text>
                                            <TouchableOpacity
                                                onPress={handleSendComment}
                                                style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w40, BaseStyle.h40, BaseStyle.radius40, BaseStyle.BgDarkGreen500, { top: 5, right: 5 }]}
                                            >
                                                <IconPaperPlanWhite width={18} height={18} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback> */}
                            </View>
                        </View>

                        {role === 'host' ? (
                            <View>
                                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.p10, BaseStyle.BgLightGreen200, ({ borderRadius: 100 })]}>
                                    <Button text={isJoined === true ? "Akhiri Siaran" : "Mulai Siaran"} color="#FFFFFF" backgroundColor={isJoined === true ? "#FF4D4D" : "#208D33"} borderRadius={50} width='82%' paddingVertical={typeof menu === "number" ? menu * 0.30 : 10} onPress={isJoined === true ? openBottomSheetLeaveChannel : openBottomSheetJoinChannel} />
                                    <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.hAuto, BaseStyle.rectangle, BaseStyle.radius50, BaseStyle.BgWhite, BaseStyle.shadow, ({ width: '16%' })]} disabled={isJoined === true ? false : true} onPress={toggleMute}>
                                        {isJoined ? (
                                            isMuted
                                                ? <IconMicNonactive width="45%" height="45%" />
                                                : <IconMicActive width="45%" height="45%" />
                                        ) : <IconMicNonactive width="45%" height="45%" />}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.p10, BaseStyle.BgLightGreen200, ({ borderRadius: 100 })]}>
                                    <Button text={isJoined === true ? "Keluar dari Siaran" : "Gabung Siaran"} color="#FFFFFF" backgroundColor={isJoined === true ? "#FF4D4D" : "#208D33"} borderRadius={50} width='100%' paddingVertical={typeof menu === "number" ? menu * 0.30 : 10} onPress={isJoined === true ? openBottomSheetLeaveChannel : openBottomSheetJoinChannel} />
                                </View>
                            </View>
                        )
                        }
                    </View>
                </View>

                {/* BottomSheet Modal */}
                {/* JOIN CHANNEL */}
                <Modal
                    transparent
                    visible={isVisibleJoinChannel}
                    animationType="slide"
                    onRequestClose={closeBottomSheetJoinChannel}
                >
                    <View style={styles.bottomSheetoverlay}>
                        {/* Close Area */}
                        <TouchableOpacity
                            style={styles.bottomSheetcloseArea}
                            onPress={closeBottomSheetJoinChannel}
                        />

                        {/* BottomSheet Content */}
                        <Animated.View style={styles.bottomSheet}>
                            <View style={[BaseStyle.alignItemsCenter, BaseStyle.pb20]}>
                                <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({ height: 4 })]} />
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Mulai Tawaf Live Sekarang</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheetJoinChannel} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                                    <IconXMarkWhite width={12} height={12} />
                                </TouchableOpacity>
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                                <View style={{ width: '48%' }}>
                                    <Button text="Tidak" color="#696B6B" backgroundColor="#EEEEEE" borderRadius={24} paddingVertical={14} width='100%' onPress={closeBottomSheetJoinChannel} />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Button text="Iya" color="#FFFFFF" backgroundColor="#208D33" borderRadius={24} paddingVertical={14} width='100%' onPress={() => { join(); closeBottomSheetJoinChannel() }} />
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>

                {/* LEAVE CHANNEL */}
                <Modal
                    transparent
                    visible={isVisibleLeaveChannel}
                    animationType="slide"
                    onRequestClose={closeBottomSheetLeaveChannel}
                >
                    <View style={styles.bottomSheetoverlay}>
                        {/* Close Area */}
                        <TouchableOpacity
                            style={styles.bottomSheetcloseArea}
                            onPress={closeBottomSheetLeaveChannel}
                        />

                        {/* BottomSheet Content */}
                        <Animated.View style={styles.bottomSheet}>
                            <View style={[BaseStyle.alignItemsCenter, BaseStyle.pb20]}>
                                <View style={[BaseStyle.w30, BaseStyle.radius4, BaseStyle.BgGray100, ({ height: 4 })]} />
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.mb20]}>
                                <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS]}>Akhiri Tawaf Live Sekarang</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={closeBottomSheetLeaveChannel} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w20, BaseStyle.h20, BaseStyle.radius20, BaseStyle.BgGray200]}>
                                    <IconXMarkWhite width={12} height={12} />
                                </TouchableOpacity>
                            </View>
                            <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.wFull]}>
                                <View style={{ width: '48%' }}>
                                    <Button text="Tidak" color="#696B6B" backgroundColor="#EEEEEE" borderRadius={24} paddingVertical={14} width='100%' onPress={closeBottomSheetLeaveChannel} />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Button text="Iya" color="#FFFFFF" backgroundColor="#FF4D4D" borderRadius={24} paddingVertical={14} width='100%' onPress={() => { leave(); closeBottomSheetLeaveChannel(); }} />
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>

                {/* PERINGATAN WAKTU LIVE TINGGAL 5 MENIT */}
                {hasWarnedFiveMinutes &&
                    <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, ({ flex: 1, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 300 })]}>
                        <View style={[BaseStyle.absolute, BaseStyle.hAuto, BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.pb20, ({ alignSelf: 'center', top: '30%', width: '70%' })]}>
                            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.h240, ({ backgroundColor: '#F9F9F9', borderTopLeftRadius: 40, borderTopRightRadius: 40 })]}>
                                <IconClockGreen02 width='80%' height='80%' />
                            </View>
                            <View style={[BaseStyle.p20, ({ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 })]}>
                                <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Waktu siaran akan segera habis dalam waktu 5 menit!</Text>
                            </View>
                        </View>
                    </View>
                }

                {/* PERINGATAN WAKTU LIVE TINGGAL 1 MENIT */}
                {hasWarnedOneMinute &&
                    <View style={[BaseStyle.absolute, BaseStyle.wFull, BaseStyle.hFull, BaseStyle.justifyCenter, ({ flex: 1, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 300 })]}>
                        <View style={[BaseStyle.absolute, BaseStyle.hAuto, BaseStyle.BgWhite, BaseStyle.radius20, BaseStyle.pb20, ({ alignSelf: 'center', top: '30%', width: '70%' })]}>
                            <View style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.wFull, BaseStyle.h240, ({ backgroundColor: '#F9F9F9', borderTopLeftRadius: 40, borderTopRightRadius: 40 })]}>
                                <IconClockGreen02 width='80%' height='80%' />
                            </View>
                            <View style={[BaseStyle.p20, ({ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 })]}>
                                <Text style={[BaseStyle.textSM, BaseStyle.MaisonDemi, BaseStyle.textBlack]}>Waktu siaran akan segera habis dalam waktu 1 menit!</Text>
                            </View>
                        </View>
                    </View>
                }
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    // BOTTOM SHEET
    bottomSheetcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    bottomSheetoverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    },
    bottomSheetcloseArea: {
        flex: 1, // Area to detect clicks outside the bottom sheet
    },
    bottomSheet: {
        height: height * 0.4, // Bottom sheet height (40% of screen)
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        zIndex: 1000, // Ensure the sheet stays on top
    },
});

export default TawafRoom;
