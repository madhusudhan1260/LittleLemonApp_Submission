import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from '../types';

interface FoodItemProps {
  item: MenuItem;
  onPress?: () => void;
}

export const FoodItem: React.FC<FoodItemProps> = ({ item, onPress }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, $${item.price.toFixed(2)}`}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.imageContainer}>
        {imageError ? (
          <View style={styles.fallbackImage}>
            <Ionicons name="restaurant-outline" size={32} color="#495E57" />
          </View>
        ) : (
          <Image
            source={item.image}
            style={styles.image}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  detailsContainer: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#66756F',
    lineHeight: 19,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495E57',
  },
  imageContainer: {
    width: 84,
    height: 84,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EDEFEE',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
  },
});
