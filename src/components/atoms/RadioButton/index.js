import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ options = [], selectedOption, onSelect = () => {} }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        return (
          <TouchableOpacity 
            key={index} 
            style={[styles.radioContainer]} 
            onPress={() => onSelect(option)}
            activeOpacity={0.7}
          >
            <View style={[styles.radioCircle]}>
              {isSelected && <View style={styles.selectedCircle} />}
            </View>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#208D33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircleBorder: {
    borderColor: '#208D33', // Warna border saat dipilih
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#208D33',
  },
  label: {
    fontSize: 16,
    color: '#696B6B',
    fontFamily: 'MaisonNeue-Book'
  },
  selectedLabel: {
    color: '#208D33', // Warna teks saat dipilih
    fontFamily: 'MaisonNeue-Demi'
  },
});

export default RadioButton;
