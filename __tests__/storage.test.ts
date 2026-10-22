import {
  getProfile,
  saveProfile,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getNotificationPreferences,
  saveNotificationPreferences,
  clearAllUserData,
  DEFAULT_NOTIFICATIONS,
  STORAGE_KEYS,
} from '../src/storage/storage';
import { UserProfile, NotificationPreferences } from '../src/types';

// Mock AsyncStorage in-memory
const store: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async (key: string) => store[key] || null),
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
  }),
  multiRemove: jest.fn(async (keys: string[]) => {
    keys.forEach((k) => delete store[k]);
  }),
  clear: jest.fn(async () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  }),
}));

describe('Storage Utility', () => {
  beforeEach(() => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
    jest.clearAllMocks();
  });

  describe('User Profile Storage', () => {
    it('returns null when no profile is saved', async () => {
      const profile = await getProfile();
      expect(profile).toBeNull();
    });

    it('persists and retrieves profile details accurately', async () => {
      const sampleProfile: UserProfile = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '(555) 123-4567',
        avatarUri: 'https://example.com/avatar.jpg',
      };

      const saveResult = await saveProfile(sampleProfile);
      expect(saveResult).toBe(true);

      const retrieved = await getProfile();
      expect(retrieved).toEqual(sampleProfile);
    });

    it('handles malformed profile json safely', async () => {
      store[STORAGE_KEYS.PROFILE] = 'invalid-json';
      const retrieved = await getProfile();
      expect(retrieved).toBeNull();
    });
  });

  describe('Onboarding Status Storage', () => {
    it('defaults to false when onboarding has not been completed', async () => {
      const completed = await isOnboardingCompleted();
      expect(completed).toBe(false);
    });

    it('sets and retrieves onboarding completed flag', async () => {
      const saveResult = await setOnboardingCompleted(true);
      expect(saveResult).toBe(true);

      const status = await isOnboardingCompleted();
      expect(status).toBe(true);
    });
  });

  describe('Notification Preferences Storage', () => {
    it('returns default preferences when nothing is stored', async () => {
      const prefs = await getNotificationPreferences();
      expect(prefs).toEqual(DEFAULT_NOTIFICATIONS);
    });

    it('saves and loads customized notification preferences', async () => {
      const customPrefs: NotificationPreferences = {
        orderStatuses: true,
        passwordChanges: false,
        specialOffers: true,
        newsletter: false,
      };

      const saved = await saveNotificationPreferences(customPrefs);
      expect(saved).toBe(true);

      const loaded = await getNotificationPreferences();
      expect(loaded).toEqual(customPrefs);
    });
  });

  describe('clearAllUserData', () => {
    it('clears profile, onboarding, and notification preferences on logout', async () => {
      // Seed some state
      await saveProfile({
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alice@example.com',
        phoneNumber: '',
        avatarUri: null,
      });
      await setOnboardingCompleted(true);

      expect(await isOnboardingCompleted()).toBe(true);
      expect(await getProfile()).not.toBeNull();

      // Clear all
      const cleared = await clearAllUserData();
      expect(cleared).toBe(true);

      expect(await isOnboardingCompleted()).toBe(false);
      expect(await getProfile()).toBeNull();
    });
  });
});
