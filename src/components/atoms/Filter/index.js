import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';

const apiStepTabungan = [
  {
    id: 1,
    // icon: require('./assets/icon/icon-tabungan-01.png'),
    title: 'Daftar',
    description: 'Mengisi Form Data Diri, NIK, Nama Lengkap, No HP, Alamat Sesuai KTP, dan Upload Foto KTP.',
  },
  {
    id: 2,
    // icon: require('./assets/icon/icon-tabungan-02.png'),
    title: 'Nabung',
    description: 'Anda bisa langsung nabung kapan saja, dimana saja dengan mudah.',
  },
  {
    id: 3,
    // icon: require('./assets/icon/icon-tabungan-03.png'),
    title: 'Berangkat',
    description: 'Anda bisa berangkat dengan tabungan umroh/haji sesuai paket yang ada.',
  },
];

export default function Filter() {
  const [search, setSearch] = useState(''); // State untuk menyimpan input pencarian

  // Filter data berdasarkan input pencarian
  const filteredData = apiStepTabungan
    .slice(0, 2) // Batasi hanya 2 elemen
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      {/* Input Pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari berdasarkan title..."
        value={search}
        onChangeText={text => setSearch(text)}
      />

      {/* Konten Data */}
      <ScrollView>
        {filteredData.map(item => (
          <View key={item.id} style={styles.card}>
            {/* <Image source={item.icon} style={styles.icon} /> */}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}

        {/* Pesan jika tidak ada hasil */}
        {filteredData.length === 0 && (
          <Text style={styles.noData}>Tidak ada data yang sesuai.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
