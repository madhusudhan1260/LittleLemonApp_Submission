import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { getInitials } from '../utils/validation';

interface AvatarProps {
  size?: number;
  uri?: string | null;
  firstName?: string;
  lastName?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 44,
  uri,
  firstName,
  lastName,
  style,
}) => {
  const initials = getInitials(firstName, lastName);
  const fontSize = Math.max(12, Math.floor(size * 0.4));

  if (uri) {
    return (
      <View
        style={[
          styles.imageContainer,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
      >
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.fallbackContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.initialsText, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#EDEFEE',
    borderWidth: 1.5,
    borderColor: '#495E57',
    overflow: 'hidden',
  },
  fallbackContainer: {
    backgroundColor: '#0F5348',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F4CE14',
  },
  initialsText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
