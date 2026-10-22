import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, UserProfile, NotificationPreferences } from '../types';
import { useProfile } from '../context/ProfileContext';
import { AppHeader } from '../components/AppHeader';
import { Avatar } from '../components/Avatar';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  formatPhoneNumber,
  validatePhoneNumber,
} from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const AVATAR_PRESETS = [
  { label: 'Chef Hat', uri: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80' },
  { label: 'Olive Branch', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
  { label: 'Mediterranean Breeze', uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const {
    profile: savedProfile,
    notifications: savedNotifications,
    updateProfile,
    updateNotifications,
    logout,
  } = useProfile();

  // Form states initialized from saved profile
  const [firstName, setFirstName] = useState(savedProfile.firstName);
  const [lastName, setLastName] = useState(savedProfile.lastName);
  const [email, setEmail] = useState(savedProfile.email);
  const [phoneNumber, setPhoneNumber] = useState(savedProfile.phoneNumber);
  const [avatarUri, setAvatarUri] = useState<string | null>(savedProfile.avatarUri);

  // Email notifications state
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    ...savedNotifications,
  });

  // Track initial values for discard / sync
  useEffect(() => {
    setFirstName(savedProfile.firstName);
    setLastName(savedProfile.lastName);
    setEmail(savedProfile.email);
    setPhoneNumber(savedProfile.phoneNumber);
    setAvatarUri(savedProfile.avatarUri);
  }, [savedProfile]);

  useEffect(() => {
    setNotifications({ ...savedNotifications });
  }, [savedNotifications]);

  const handleToggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Profile Photo',
      'Select a photo for your Little Lemon profile:',
      [
        {
          text: 'Chef Avatar',
          onPress: () => setAvatarUri(AVATAR_PRESETS[0].uri),
        },
        {
          text: 'Summer Foodie',
          onPress: () => setAvatarUri(AVATAR_PRESETS[1].uri),
        },
        {
          text: 'Bistro Patron',
          onPress: () => setAvatarUri(AVATAR_PRESETS[2].uri),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleRemoveAvatar = () => {
    setAvatarUri(null);
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleDiscard = () => {
    Keyboard.dismiss();
    setFirstName(savedProfile.firstName);
    setLastName(savedProfile.lastName);
    setEmail(savedProfile.email);
    setPhoneNumber(savedProfile.phoneNumber);
    setAvatarUri(savedProfile.avatarUri);
    setNotifications({ ...savedNotifications });
    Alert.alert('Changes Discarded', 'Your profile details have been restored to the last saved state.');
  };

  const handleSave = async () => {
    Keyboard.dismiss();

    // Validation
    if (!validateFirstName(firstName)) {
      Alert.alert('Invalid First Name', 'First name is required and should only contain letters.');
      return;
    }

    if (!validateLastName(lastName)) {
      Alert.alert('Invalid Last Name', 'Last name should only contain letters.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address format.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const updatedProfile: UserProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      avatarUri,
    };

    const profileSaved = await updateProfile(updatedProfile);
    const notifsSaved = await updateNotifications(notifications);

    if (profileSaved && notifsSaved) {
      Alert.alert('Success', 'Your profile and notification preferences have been saved.');
    } else {
      Alert.alert('Error', 'Unable to save profile changes. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out from Little Lemon? Your session data will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            const success = await logout();
            if (success) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }],
              });
            } else {
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header with Back Button and Logo */}
      <AppHeader
        showBack={true}
        onBackPress={() => navigation.goBack()}
        showAvatar={true}
        avatarUri={avatarUri}
        firstName={firstName}
        lastName={lastName}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Section: Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Personal Information</Text>

            {/* Avatar Row */}
            <Text style={styles.fieldLabel}>Avatar</Text>
            <View style={styles.avatarRow}>
              <Avatar
                size={76}
                uri={avatarUri}
                firstName={firstName}
                lastName={lastName}
              />
              <View style={styles.avatarButtonsContainer}>
                <TouchableOpacity
                  style={styles.changeAvatarButton}
                  onPress={handleChangeAvatar}
                  accessibilityRole="button"
                  accessibilityLabel="Change avatar image"
                >
                  <Text style={styles.changeAvatarText}>Change</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeAvatarButton}
                  onPress={handleRemoveAvatar}
                  accessibilityRole="button"
                  accessibilityLabel="Remove avatar image"
                >
                  <Text style={styles.removeAvatarText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* First Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>First name *</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
            </View>

            {/* Last Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Last name</Text>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Email *</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                placeholder="(555) 000-0000"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Section: Email Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Email notifications</Text>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => handleToggleNotification('orderStatuses')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.orderStatuses }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.orderStatuses && styles.checkboxChecked,
                ]}
              >
                {notifications.orderStatuses && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Order statuses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => handleToggleNotification('passwordChanges')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.passwordChanges }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.passwordChanges && styles.checkboxChecked,
                ]}
              >
                {notifications.passwordChanges && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Password changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => handleToggleNotification('specialOffers')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.specialOffers }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.specialOffers && styles.checkboxChecked,
                ]}
              >
                {notifications.specialOffers && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Special offers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => handleToggleNotification('newsletter')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.newsletter }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.newsletter && styles.checkboxChecked,
                ]}
              >
                {notifications.newsletter && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Newsletter</Text>
            </TouchableOpacity>
          </View>

          {/* Log out Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Log out"
          >
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>

          {/* Action Row: Discard and Save Changes */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.discardButton}
              onPress={handleDiscard}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Discard changes"
            >
              <Text style={styles.discardButtonText}>Discard changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Save changes"
            >
              <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#66756F',
    marginBottom: 6,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
  },
  changeAvatarButton: {
    backgroundColor: '#495E57',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  changeAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  removeAvatarButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeAvatarText: {
    color: '#495E57',
    fontWeight: '700',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  textInput: {
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED2D0',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333333',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#495E57',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EE9972',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  discardButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#66756F',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
