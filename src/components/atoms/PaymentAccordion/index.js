import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IconCaretDownGreen, IconCaretUpGreen } from '../../../assets';

const bank = [
  { bankName: 'BCA', logo: require('../../../assets/logo/logo-bank-bca.png') },
  { bankName: 'Mandiri', logo: require('../../../assets/logo/logo-bank-mandiri.png') },
  { bankName: 'BNI', logo: require('../../../assets/logo/logo-bank-bni.png') },
  { bankName: 'BRI', logo: require('../../../assets/logo/logo-bank-bri.png') },
  { bankName: 'Permata', logo: require('../../../assets/logo/logo-bank-permata.png') },
  { bankName: 'BSI', logo: require('../../../assets/logo/logo-bank-bsi.png') },
];

const agent = [
  { bankName: 'Alfamart', logo: require('../../../assets/logo/logo-agent-alfamart.png') },
  { bankName: 'Indomaret', logo: require('../../../assets/logo/logo-agent-indomaret.png') },
];

const PaymentAccordion = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [expandedBank, setExpandedBank] = useState(false);
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

  const renderItem = (item) => (
    <TouchableOpacity 
      key={item.bankName} 
      style={styles.itemContainer} 
      onPress={() => handleSelect(item.bankName)}
    >
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.text}>{item.bankName}</Text>
      <View style={styles.radioButtonOuter}>
        {selectedPayment === item.bankName && <View style={styles.radioButtonInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpandedBank(!expandedBank || selectedPayment && bank.some(item => item.bankName === selectedPayment))}>
        <Text style={styles.accordionTitle}>Pilih Bank</Text>
        {expandedBank ? (<IconCaretDownGreen width={16} height={16} />) : (<IconCaretUpGreen width={16} height={16} />)}
        {/* <AntDesign name={expandedBank ? "caretup" : "caretdown"} size={16} color="black" /> */}
      </TouchableOpacity>
      {expandedBank && bank.map(renderItem)}

      <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpandedAgent(!expandedAgent || selectedPayment && agent.some(item => item.bankName === selectedPayment))}>
        <Text style={styles.accordionTitle}>Pilih Agen Pembayaran</Text>
        {expandedAgent ? (<IconCaretDownGreen width={16} height={16} />) : (<IconCaretUpGreen width={16} height={16} />)}
        {/* <AntDesign name={expandedAgent ? "caretup" : "caretdown"} size={16} color="black" /> */}
      </TouchableOpacity>
      {expandedAgent && agent.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});

export default PaymentAccordion;
