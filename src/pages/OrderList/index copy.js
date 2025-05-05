import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import pesananData from '../../hook/pesanan/pesananFetch.js'

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';
import { CardTicketHorizontal } from '../../components/index.js';

const OrderListContent = ({navigation, orderStatus}) => {
  // ORDER LIST DATA
  const {pesanan, loadingPesanan, errorPesanan} = pesananData();
  const filteredPesanan = !loadingPesanan ? pesanan.filter(item => item.status === orderStatus) : [];

  return (
    <View style={[BaseStyle.wrap]}>
      <FlatList
        data={filteredPesanan}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <CardTicketHorizontal thumbnail={item.image} date={`${item.orderDate[0].date} - ${item.orderDate[0].time}`}  title={item.eventTitle} price={Number(item.totalPrice).toLocaleString('id-ID')} onPress={() => navigation.navigate('TicketDetail')} />
          </View>
        )}
      />
    </View>
  );
};

const OrderList = ({navigation}) => {
  const [index, setIndex] = useState(1);
  const handleIndexChange = (newIndex) => {
    console.log("Tab Aktif:", newIndex); // Debugging
    setIndex(newIndex);
  };
  const [routes] = useState([
    { key: 'active', title: 'Aktif' },
    { key: 'completed', title: 'Selesai' },
    { key: 'notYetPaid', title: 'Belum Bayar' },
    { key: 'canceled', title: 'Dibatalkan' },
  ]);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  return (
    <View style={[BaseStyle.container]}>
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
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Pesanan Saya</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: headerHeight }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={({ route }) => <OrderListContent navigation={navigation} orderStatus={route.key} />}
          onIndexChange={handleIndexChange}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{ backgroundColor: '#2CA44B', paddingTop: 10 }}
              tabStyle={{ width: 'auto' }}
              scrollEnabled={true}
              pressColor="transparent"
            />
          )}
          style={{
            position: 'relative',
            top: -10,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </View>
    </View>
  );
};

export default OrderList;
