import React, { useState, memo } from 'react';
import { View, Text, FlatList, Image, Dimensions, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import pesananData from '../../hook/pesanan/pesananFetch.js'

// ASSETS IMAGE
import { IconArrowLeftWhite } from '../../assets/index.js';

// COMPONENT
import { CardOrderHorizontal } from '../../components/index.js';

const STATUS_MAPPING = {
  active: 'Aktif',
  notYetPaid: 'Belum dibayar',
  completed: 'Selesai',
  canceled: 'Dibatalkan',
};

const OrderListContent = memo(({ status, navigation }) => {
  // ORDER LIST DATA
  const {pesanan, loadingPesanan, errorPesanan} = pesananData();
  
  // Filter dan urutkan berdasarkan ID terbaru di posisi pertama
  const data = !loadingPesanan 
    ? pesanan
        .filter(item => item.status === status)
        .sort((a, b) => b.id - a.id) // Mengurutkan dari ID terbesar ke terkecil (terbaru ke lama)
    : [];

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={() => <View style={{ height: 10 }} />}
      ListFooterComponent={() => <View style={{ height: 20 }} />}
      ListEmptyComponent={() =>
        loadingPesanan ? (
          <View style={{flex: 1, alignSelf: 'center'}}>
            <ActivityIndicator size="large" color="#208D33" />
          </View>
        ) : (
          <Text style={{ textAlign: 'center', padding: 20 }}>Tidak ada pesanan</Text>
        )
      }
      renderItem={({ item }) => {
        const status = item.status
        return (
          <View style={{paddingHorizontal: 14}}>
            <CardOrderHorizontal
              image={item.image}
              date={`${item.orderDate[0].date} - ${item.orderDate[0].time}`}
              title={item.eventTitle}
              price={Number(item.totalPrice).toLocaleString('id-ID')}
              qrCode={item.qrCode}
              status={status}
              onPress={() => {
                if(status === "active"){
                  navigation.navigate("OrderQrCode", {idTicket: item.id, qrCode: item.qrCode})
                } else if (status === "notYetPaid"){
                  navigation.navigate("OrderTicketStatus", {idTicket: item.id, image: item.image, date: `${item.orderDate[0].date} - ${item.orderDate[0].time}`, title: item.eventTitle, price: Number(item.totalPrice).toLocaleString('id-ID'), status: status, qrCode: item.qrCode})
                } else if (status === "completed"){
                  navigation.navigate("OrderTicketStatus", {idTicket: item.id, image: item.image, date: `${item.orderDate[0].date} - ${item.orderDate[0].time}`, title: item.eventTitle, price: Number(item.totalPrice).toLocaleString('id-ID'), status: status, qrCode: item.qrCode})
                } else if (status === "canceled"){
                  navigation.navigate("OrderTicketStatus", {idTicket: item.id, image: item.image, date: `${item.orderDate[0].date} - ${item.orderDate[0].time}`, title: item.eventTitle, price: Number(item.totalPrice).toLocaleString('id-ID'), status: status, qrCode: item.qrCode})
                }
              }}
            />
          </View>
        )
      }}
    />
  );
});

const initialLayout = { width: Dimensions.get('window').width };

const OrderList = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(0);

  // HEADER HEIGHT
  const [headerHeight, setHeaderHeight] = useState(0);

  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  const { pesanan = [], loadingPesanan, errorPesanan } = pesananData();

  // State untuk jumlah pesanan di setiap kategori
  const [orderCounts, setOrderCounts] = useState({
    active: 0,
    notYetPaid: 0,
    completed: 0,
    canceled: 0,
  });

  // Update jumlah pesanan setelah data diambil
  const [forceRender, setForceRender] = useState(false);

  React.useEffect(() => {
    if (!loadingPesanan && pesanan) {
      const newOrderCounts = {
        active: pesanan.filter(item => item.status === 'active').length,
        notYetPaid: pesanan.filter(item => item.status === 'notYetPaid').length,
        completed: pesanan.filter(item => item.status === 'completed').length,
        canceled: pesanan.filter(item => item.status === 'canceled').length,
      };
  
      setOrderCounts(newOrderCounts);
  
      setForceRender(prev => !prev); // Paksa re-render agar TabView membaca ulang jumlah pesanan
    }
  }, [pesanan, loadingPesanan]);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: 'active', title: 'Aktif' },
    { key: 'notYetPaid', title: 'Belum Dibayar' },
    { key: 'completed', title: 'Selesai' },
    { key: 'canceled', title: 'Dibatalkan' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'active':
        return <OrderListContent status="active" navigation={navigation} />;
      case 'notYetPaid':
        return <OrderListContent status="notYetPaid" navigation={navigation} />;
      case 'completed':
        return <OrderListContent status="completed" navigation={navigation} />;
      case 'canceled':
        return <OrderListContent status="canceled" navigation={navigation} />;
      default:
        return <View />;
    }
  };

  const renderLabel = ({ route, focused }) => {
    const count = orderCounts[route.key] || 0; // Pastikan tidak undefined
    return (
      <View style={[BaseStyle.relative, BaseStyle.alignItemsCenter]}>
        {/* Menampilkan jumlah pesanan */}
        {orderCounts[route.key] > 0 && (
          <View style={{backgroundColor: 'red', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, position: 'absolute', top: 0, zIndex: 10}}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{count}</Text>
          </View>
        )}
        <Text style={{fontSize: 16, fontWeight: 'bold', color: focused ? 'white' : '#D1D5DB', textTransform: 'capitalize', marginTop: 10}}>{route.title}</Text>
      </View>
    )
  }

  return (
    <View style={[BaseStyle.container, BaseStyle.BgGray10]}>
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
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.navigate("MainApp", {screen: "Profil"})}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Pesanan Saya</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: headerHeight }}>
        <TabView
          key={forceRender}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white', height: 3, borderTopStartRadius: 3, borderTopEndRadius: 3 }}
              style={{ backgroundColor: '#2CA44B', paddingTop: 10 }}
              renderLabel={renderLabel}
              pressColor="transparent"
              tabStyle={{ width: 'auto' }}
              scrollEnabled={true}
            />
          )}
          style={{position: 'relative', top: -10, bottom: 0, left: 0, right: 0,}}
        />
      </View>
    </View>
  );
};

export default OrderList;
