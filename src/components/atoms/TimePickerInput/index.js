import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import BaseStyle from '../../../assets/style/AppStyle.js'
import { IconClockGrey } from '../../../assets/index.js';

const TimePickerInput = ({lable, placeholder, placeholderColor='#696B6B', icon, width='100%', borderColor= '#B1B1BC', backgroundColor='#EEEEEE', endDate, onChange, setEndDateWarning, setEndDateBorderColor, ...restProps}) => {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formattedTime, setFormattedTime] = useState('');

  const handleConfirm = (selectedTime) => {
    setTime(selectedTime);

    const now = new Date();

    // Jika endDate adalah hari ini, set waktu minimal 1 jam ke depan
    if (endDate && endDate.toDateString() === now.toDateString()) {
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Tambah 1 jam
      if (selectedTime < oneHourLater) {
        selectedTime = oneHourLater;
      }
    }

    // Format waktu menjadi HH:mm (24 jam)
    const formatted = selectedTime.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23', // Pastikan format 24 jam
    });
  
    setFormattedTime(formatted);
    setOpen(false);
  
    if (onChange) {
      onChange(formatted); // Kirim objek Date ke parent
    }
  };

  const isDisabled = endDate === null;

  return (
    <View style={[styles.container(width, borderColor), BaseStyle.radius10, ({backgroundColor: isDisabled ? '#EEEEEE' : '#FFFFFF'})]}>
      <Text style={[BaseStyle.absolute, BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXS, BaseStyle.mb10, BaseStyle.index1, ({left: 10, top: 10})]}>{lable}</Text>
      <TouchableOpacity
        onPress={() => {
            if (isDisabled) {
              setEndDateWarning(true);
              setEndDateBorderColor('#FF4D4D');
              return;
            }
            setOpen(true);
          }
        }
      >
        <TextInput
          style={styles.input(placeholderColor)}
          placeholder="Pilih Waktu"
          value={formattedTime}
          editable={false}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={time}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
      <IconClockGrey width={20} height={20} style={[BaseStyle.absolute, ({right: 12, top: '50%'})]} />
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

export default TimePickerInput;
