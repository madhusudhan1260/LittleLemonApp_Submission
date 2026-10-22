import { ImageSourcePropType } from 'react-native';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarUri: string | null;
}

export interface NotificationPreferences {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
}

export type CategoryType = 'all' | 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: ImageSourcePropType;
  imageUrl?: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
};
