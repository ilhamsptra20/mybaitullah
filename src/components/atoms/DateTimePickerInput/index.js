import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import BaseStyle from '../../../assets/style/AppStyle.js'
import { IconCalendarGrey } from '../../../assets/index.js';

const DateTimePickerInput = ({lable, placeholder, placeholderColor='#696B6B', icon, width='100%', borderColor= '#B1B1BC', onChange, ...restProps}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setFormattedDate(selectedDate.toLocaleDateString('id-ID')); // Format hanya untuk tampilan
    setOpen(false);
    if (onChange) {
      onChange(selectedDate); // Kirim objek Date
    }
  };

  return (
    <View style={[styles.container(width, borderColor), BaseStyle.radius10]}>
      <Text style={[BaseStyle.absolute, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10, BaseStyle.index1, ({left: 10, top: 10})]}>{lable}</Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <TextInput
          style={styles.input(placeholderColor)}
          placeholder="Pilih Tanggal"
          value={formattedDate}
          editable={false}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
      <IconCalendarGrey width={20} height={20} style={[BaseStyle.absolute, ({right: 12, top: '50%'})]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: (width, borderColor) => ({
    position: 'relative',
    width: width,
    paddingTop: 24,
    borderColor: borderColor,
    borderWidth: 1,
  }),
  input: (placeholderColor) => ({
    width: '100%',
    paddingHorizontal: 12,
    color: placeholderColor,
    fontSize: 13,
    fontFamily: 'MaisonNeue-Book',
  }),
});

export default DateTimePickerInput;
