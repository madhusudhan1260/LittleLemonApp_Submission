import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, NotificationPreferences } from '../types';
import {
  getProfile,
  saveProfile,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getNotificationPreferences,
  saveNotificationPreferences,
  clearAllUserData,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_PROFILE,
} from '../storage/storage';

interface ProfileContextType {
  profile: UserProfile;
  notifications: NotificationPreferences;
  isOnboarded: boolean;
  isLoading: boolean;
  updateProfile: (profile: UserProfile) => Promise<boolean>;
  updateNotifications: (prefs: NotificationPreferences) => Promise<boolean>;
  completeOnboarding: (firstName: string, email: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [notifications, setNotifications] = useState<NotificationPreferences>(DEFAULT_NOTIFICATIONS);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load persisted state on startup
  const loadInitialData = async () => {
    try {
      const [savedProfile, onboardedStatus, savedNotifications] = await Promise.all([
        getProfile(),
        isOnboardingCompleted(),
        getNotificationPreferences(),
      ]);

      if (savedProfile) {
        setProfile(savedProfile);
      }
      setIsOnboarded(onboardedStatus);
      setNotifications(savedNotifications);
    } catch (error) {
      console.error('Error initializing ProfileContext:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const refreshProfile = async () => {
    const saved = await getProfile();
    if (saved) {
      setProfile(saved);
    }
    const notifs = await getNotificationPreferences();
    setNotifications(notifs);
  };

  const updateProfile = async (newProfile: UserProfile): Promise<boolean> => {
    const success = await saveProfile(newProfile);
    if (success) {
      setProfile(newProfile);
    }
    return success;
  };

  const updateNotifications = async (newPrefs: NotificationPreferences): Promise<boolean> => {
    const success = await saveNotificationPreferences(newPrefs);
    if (success) {
      setNotifications(newPrefs);
    }
    return success;
  };

  const completeOnboarding = async (firstName: string, email: string): Promise<boolean> => {
    const newProfile: UserProfile = {
      ...DEFAULT_PROFILE,
      firstName: firstName.trim(),
      email: email.trim(),
    };

    const saved = await saveProfile(newProfile);
    const marked = await setOnboardingCompleted(true);

    if (saved && marked) {
      setProfile(newProfile);
      setIsOnboarded(true);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<boolean> => {
    const cleared = await clearAllUserData();
    if (cleared) {
      setProfile(DEFAULT_PROFILE);
      setNotifications(DEFAULT_NOTIFICATIONS);
      setIsOnboarded(false);
      return true;
    }
    return false;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        notifications,
        isOnboarded,
        isLoading,
        updateProfile,
        updateNotifications,
        completeOnboarding,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
