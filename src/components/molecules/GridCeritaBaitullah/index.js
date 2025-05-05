import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { CardBlogVertical } from '../../atoms';

const { width } = Dimensions.get('window');

const GridCeritaBaitullah = ({data}) => {
  // Membagi data ke dalam dua kolom
  const leftColumn = data.filter((_, index) => index % 2 === 0);
  const rightColumn = data.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.column, ({marginLeft: 14, marginRight: 8})]}>
        {leftColumn.map((item) => (
          <CardBlogVertical key={item.id} thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} widht='100%' newBlog={false} />
        ))}
      </View>
      <View style={[styles.column, ({marginRight: 14, marginLeft: 8})]}>
        {rightColumn.map((item) => (
          <CardBlogVertical key={item.id} thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} widht='100%' newBlog={false} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    gap: 14,
    marginBottom: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    width: (width - 40) / 2, // Membagi lebar layar menjadi dua kolom
  },
  image: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default GridCeritaBaitullah;
