import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    Home,
    Tawaf,
    TawafLiveJoin,
    TawafLiveStatus,
    TawafRoom,
    TawafLiveList,
    MyChannel,
    CreateTawafChannel,
    Ticket,
    CeritaBaitullah,
    CeritaBaitullahList,
    CeritaBaitullahDetail,
    Profile,
    ProfileEdit,
    TicketList,
    TicketDetail,
    OrderBiodata,
    OrderPay,
    OrderPaymentMethod,
    OrderStatus,
    OrderQrCode,
    OrderList,
    OrderTicketStatus,
    SplashScreen,
    SignIn,
    SignUp,
    SignUpProfile,
    Otp,
    ForgotPasswordVerification,
    ForgotPassword,
    IntroScreen,
    QuranListScreen,
    QuranDetailScreen,
    QiblaScreen,
    PrayerScreen,
    SubPrayerScreen,
    DetailPrayerScreen,
    ComingSoon,
    ApplicationInformation,
    AdviceAndHelp,
    AdviceAndHelpDetail,
    DeleteAccount,
} from '../pages';

import { BottomNavigator } from "../components/molecules";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen name="Beranda" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Tawaf Live" component={Tawaf} options={{ headerShown: false }} />
            <Tab.Screen name="Cerita Baitullah" component={CeritaBaitullah} options={{ headerShown: false }} />
            <Tab.Screen name="Profil" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const DrawerMenu = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: "#e6e6e6",
                    width: 240,
                },
            }}
        >
        </Drawer.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpProfile" component={SignUpProfile} options={{ headerShown: false }} />
            <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordVerification" component={ForgotPasswordVerification} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="CeritaBaitullahList" component={CeritaBaitullahList} options={{ headerShown: false }} />
            <Stack.Screen name="CeritaBaitullahDetail" component={CeritaBaitullahDetail} options={{ headerShown: false }} />
            <Stack.Screen name="Ticket" component={Ticket} options={{ headerShown: false }} />
            <Stack.Screen name="TicketList" component={TicketList} options={{ headerShown: false }} />
            <Stack.Screen name="TicketDetail" component={TicketDetail} options={{ headerShown: false }} />
            <Stack.Screen name="OrderBiodata" component={OrderBiodata} options={{ headerShown: false }} />
            <Stack.Screen name="OrderPay" component={OrderPay} options={{ headerShown: false }} />
            <Stack.Screen name="OrderPaymentMethod" component={OrderPaymentMethod} options={{ headerShown: false }} />
            <Stack.Screen name="OrderStatus" component={OrderStatus} options={{ headerShown: false }} />
            <Stack.Screen name="OrderQrCode" component={OrderQrCode} options={{ headerShown: false }} />
            <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} />
            <Stack.Screen name="OrderTicketStatus" component={OrderTicketStatus} options={{ headerShown: false }} />
            <Stack.Screen name="MyChannel" component={MyChannel} options={{ headerShown: false }} />
            <Stack.Screen name="CreateTawafChannel" component={CreateTawafChannel} options={{ headerShown: false }} />
            <Stack.Screen name="TawafLiveJoin" component={TawafLiveJoin} options={{ headerShown: false }} />
            <Stack.Screen name="TawafLiveStatus" component={TawafLiveStatus} options={{ headerShown: false }} />
            <Stack.Screen name="TawafRoom" component={TawafRoom} options={{ headerShown: false }} />
            <Stack.Screen name="TawafLiveList" component={TawafLiveList} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
            <Stack.Screen name="QuranListScreen" component={QuranListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QuranDetailScreen" component={QuranDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QiblaScreen" component={QiblaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PrayerScreen" component={PrayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SubPrayerScreen" component={SubPrayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailPrayerScreen" component={DetailPrayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ headerShown: false }} />
            <Stack.Screen name="ApplicationInformation" component={ApplicationInformation} options={{ headerShown: false }} />
            <Stack.Screen name="AdviceAndHelp" component={AdviceAndHelp} options={{ headerShown: false }} />
            <Stack.Screen name="AdviceAndHelpDetail" component={AdviceAndHelpDetail} options={{ headerShown: false }} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default Router;