import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from './Avatar';

interface AppHeaderProps {
  showBack?: boolean;
  onBackPress?: () => void;
  showAvatar?: boolean;
  onAvatarPress?: () => void;
  avatarUri?: string | null;
  firstName?: string;
  lastName?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showBack = false,
  onBackPress,
  showAvatar = true,
  onAvatarPress,
  avatarUri,
  firstName,
  lastName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <View style={styles.backIconCircle}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.centerContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Little Lemon Logo"
        />
      </View>

      <View style={styles.rightContainer}>
        {showAvatar ? (
          <TouchableOpacity
            onPress={onAvatarPress}
            disabled={!onAvatarPress}
            accessibilityLabel="View profile"
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Avatar
              size={40}
              uri={avatarUri}
              firstName={firstName}
              lastName={lastName}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  logo: {
    width: 170,
    height: 42,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
