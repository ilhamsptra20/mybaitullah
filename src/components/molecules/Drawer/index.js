import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

export default function Drawer() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-250)); // Sidebar awal berada di luar layar

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      // Tutup sidebar
      Animated.timing(sidebarAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      // Buka sidebar
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol untuk membuka sidebar */}
      <TouchableOpacity style={styles.button} onPress={toggleSidebar}>
        <Text style={styles.buttonText}>Toggle Sidebar</Text>
      </TouchableOpacity>

      {/* Overlay untuk menutup sidebar ketika klik di luar */}
      {isSidebarVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnimation }] },
        ]}
      >
        <Text style={styles.sidebarTitle}>Menu</Text>
        <TouchableOpacity style={styles.menuItem} onPress={toggleSidebar}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={toggleSidebar}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={toggleSidebar}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: height, // Tinggi mengikuti panjang layar
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10, // Pastikan sidebar di atas elemen lain
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height, // Sama seperti layar penuh
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5, // Pastikan overlay berada di belakang sidebar
  },
});
