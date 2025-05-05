import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { Button } from '../../components/index.js';

// ICON
import { IconCaretUpGreen, IconCaretDownGreen, IconArrowLeftBlack} from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// BANK LIST
const bank = [
  { bankName: 'BCA', logo: require('../../assets/logo/logo-bank-bca.png') },
  { bankName: 'Mandiri', logo: require('../../assets/logo/logo-bank-mandiri.png') },
  { bankName: 'BNI', logo: require('../../assets/logo/logo-bank-bni.png') },
  { bankName: 'BRI', logo: require('../../assets/logo/logo-bank-bri.png') },
  { bankName: 'Permata', logo: require('../../assets/logo/logo-bank-permata.png') },
  { bankName: 'BSI', logo: require('../../assets/logo/logo-bank-bsi.png') },
];

const agent = [
  { bankName: 'Alfamart', logo: require('../../assets/logo/logo-agent-alfamart.png') },
  { bankName: 'Indomaret', logo: require('../../assets/logo/logo-agent-indomaret.png') },
];

const OrderPay = ({navigation}) => {
  // AMBIL ID TICKET
  const route = useRoute();
  const {idTicket} = route.params

  const width = Dimensions.get('window').width;

  // PACKAGE HEIGHT COMPONENT
  const [headerHeight, setHeaderHeight] = useState(0);

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [expandedBank, setExpandedBank] = useState(true);
  const [expandedAgent, setExpandedAgent] = useState(false);

  const handleSelect = (itemName) => {
    setSelectedPayment(itemName);
    if (bank.some(item => item.bankName === itemName)) {
      setExpandedBank(true);
      setExpandedAgent(false);
    } else if (agent.some(item => item.bankName === itemName)) {
      setExpandedAgent(true);
      setExpandedBank(false);
    }
  };

  const renderItemPaymentMethod = (item) => (
    <TouchableOpacity 
      key={item.bankName} 
      style={styles.itemContainer} 
      onPress={() => handleSelect(item.bankName)}
    >
      <Image source={item.logo} style={[BaseStyle.w30, BaseStyle.h30, BaseStyle.mr10]} />
      <Text style={[BaseStyle.MaisonBook, BaseStyle.textGray300, BaseStyle.textXS, ({flex: 1})]}>{item.bankName}</Text>
      <View style={styles.radioButtonOuter}>
        {selectedPayment === item.bankName && <View style={styles.radioButtonInner} />}
      </View>
    </TouchableOpacity>
  );
    
  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true} />

      {/* HEADER */}
      <View
        style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, BaseStyle.BgWhite, BaseStyle.navScroll, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10})]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
      >
          <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5, BaseStyle.BgTrasnparent]}>
              <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.w30, BaseStyle.h30, BaseStyle.BgTrasnparent]} onPress={() => navigation.goBack()}>
                  <IconArrowLeftBlack width={20} height={20} />
              </TouchableOpacity>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL]}>Metode Pembayaran</Text>
              <View style={[BaseStyle.w30, BaseStyle.w30]} />
          </View>
      </View>

      <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            let offset = e.nativeEvent.contentOffset.y
            if(offset >= 1){
              setNavShadow(true)
            }else{
              setNavShadow(false)
            }
          }}
      >
        <View style={{paddingTop: headerHeight}} />
        <View style={[BaseStyle.wrap]}>
          <TouchableOpacity style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.p10,]} onPress={() => setExpandedBank(!expandedBank || selectedPayment && bank.some(item => item.bankName === selectedPayment))}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM]}>Pilih Bank</Text>
            {expandedBank ? (<IconCaretDownGreen width={24} height={24} />) : (<IconCaretUpGreen width={24} height={24} />)}
          </TouchableOpacity>
          {expandedBank && bank.map(renderItemPaymentMethod)}
    
          <TouchableOpacity style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.p10,]} onPress={() => setExpandedAgent(!expandedAgent || selectedPayment && agent.some(item => item.bankName === selectedPayment))}>
            <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textSM]}>Pilih Agen Pembayaran</Text>
            {expandedAgent ? (<IconCaretDownGreen width={24} height={24} />) : (<IconCaretUpGreen width={24} height={24} />)}
          </TouchableOpacity>
          {expandedAgent && agent.map(renderItemPaymentMethod)}
        </View>
      </ScrollView>

      {/* CHECKOUT CONTENT */}
      <View style={[BaseStyle.wrap, BaseStyle.shadow]}>
        <Button text="Konfirmasi" color='#FFFFFF' backgroundColor='#208D33' borderRadius={24} width='100%' paddingVertical={14} onPress={() => navigation.navigate('OrderPay', {idTicket: idTicket})} />
      </View>
    </View>
  )
}

export default OrderPay

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#208D33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#208D33',
  },
})