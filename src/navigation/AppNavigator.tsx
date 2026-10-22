import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useProfile } from '../context/ProfileContext';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isOnboarded, isLoading } = useProfile();

  // Show a branded loading splash screen while persistent storage is being read
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
          accessibilityLabel="Little Lemon Logo"
        />
        <ActivityIndicator size="large" color="#495E57" style={styles.spinner} />
        <Text style={styles.loadingText}>Loading Little Lemon...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
        initialRouteName={isOnboarded ? 'Home' : 'Onboarding'}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingLogo: {
    width: 220,
    height: 60,
    marginBottom: 24,
  },
  spinner: {
    marginVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#66756F',
    fontWeight: '500',
  },
});
