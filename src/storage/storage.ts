import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, NotificationPreferences } from '../types';

export const STORAGE_KEYS = {
  PROFILE: '@little_lemon_profile',
  ONBOARDING_COMPLETED: '@little_lemon_onboarding_completed',
  NOTIFICATIONS: '@little_lemon_notifications',
};

export const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: true,
  newsletter: true,
};

export const DEFAULT_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  avatarUri: null,
};

/**
 * Retrieves the saved user profile from persistent storage.
 */
export async function getProfile(): Promise<UserProfile | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!jsonValue) {
      return null;
    }
    const parsed = JSON.parse(jsonValue);
    return {
      firstName: typeof parsed.firstName === 'string' ? parsed.firstName : '',
      lastName: typeof parsed.lastName === 'string' ? parsed.lastName : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      phoneNumber: typeof parsed.phoneNumber === 'string' ? parsed.phoneNumber : '',
      avatarUri: typeof parsed.avatarUri === 'string' ? parsed.avatarUri : null,
    };
  } catch (error) {
    console.error('Error reading profile from AsyncStorage:', error);
    return null;
  }
}

/**
 * Saves or updates user profile in persistent storage.
 */
export async function saveProfile(profile: UserProfile): Promise<boolean> {
  try {
    const jsonValue = JSON.stringify(profile);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving profile to AsyncStorage:', error);
    return false;
  }
}

/**
 * Checks whether the user has completed the onboarding flow.
 */
export async function isOnboardingCompleted(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

/**
 * Sets the onboarding completed status in persistent storage.
 */
export async function setOnboardingCompleted(completed: boolean): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed ? 'true' : 'false');
    return true;
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    return false;
  }
}

/**
 * Retrieves email notification preferences from persistent storage.
 */
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!jsonValue) {
      return DEFAULT_NOTIFICATIONS;
    }
    const parsed = JSON.parse(jsonValue);
    return {
      orderStatuses: typeof parsed.orderStatuses === 'boolean' ? parsed.orderStatuses : DEFAULT_NOTIFICATIONS.orderStatuses,
      passwordChanges: typeof parsed.passwordChanges === 'boolean' ? parsed.passwordChanges : DEFAULT_NOTIFICATIONS.passwordChanges,
      specialOffers: typeof parsed.specialOffers === 'boolean' ? parsed.specialOffers : DEFAULT_NOTIFICATIONS.specialOffers,
      newsletter: typeof parsed.newsletter === 'boolean' ? parsed.newsletter : DEFAULT_NOTIFICATIONS.newsletter,
    };
  } catch (error) {
    console.error('Error reading notification preferences:', error);
    return DEFAULT_NOTIFICATIONS;
  }
}

/**
 * Saves notification preferences to persistent storage.
 */
export async function saveNotificationPreferences(prefs: NotificationPreferences): Promise<boolean> {
  try {
    const jsonValue = JSON.stringify(prefs);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    return false;
  }
}

/**
 * Clears all user data upon logout.
 */
export async function clearAllUserData(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PROFILE,
      STORAGE_KEYS.ONBOARDING_COMPLETED,
      STORAGE_KEYS.NOTIFICATIONS,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
}
