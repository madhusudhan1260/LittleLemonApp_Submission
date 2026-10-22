import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useProfile } from '../context/ProfileContext';
import { validateFirstName, validateEmail } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { completeOnboarding } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFirstNameValid = validateFirstName(firstName);
  const isEmailValid = validateEmail(email);
  const isFormValid = isFirstNameValid && isEmailValid;

  const handleNext = async () => {
    Keyboard.dismiss();
    if (!isFormValid) {
      setFirstNameTouched(true);
      setEmailTouched(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await completeOnboarding(firstName, email);
      if (success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Unable to save your details. Please try again.');
      }
    } catch (error) {
      console.error('Onboarding submission error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="Little Lemon Logo"
              />
            </View>

            {/* Welcome Banner */}
            <View style={styles.heroBanner}>
              <Text style={styles.welcomeTitle}>Welcome to Little Lemon</Text>
              <Text style={styles.welcomeSubtitle}>
                Let's get to know you before you explore our menu.
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* First Name Field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>First Name *</Text>
                <TextInput
                  style={[
                    styles.input,
                    firstNameTouched && !isFirstNameValid && styles.inputError,
                  ]}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    if (!firstNameTouched) setFirstNameTouched(true);
                  }}
                  onBlur={() => setFirstNameTouched(true)}
                  placeholder="Enter your first name"
                  placeholderTextColor="#999999"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                {firstNameTouched && !isFirstNameValid && (
                  <Text style={styles.errorText}>
                    Please enter a valid first name (letters only).
                  </Text>
                )}
              </View>

              {/* Email Address Field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={[
                    styles.input,
                    emailTouched && !isEmailValid && styles.inputError,
                  ]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="Enter your email"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleNext}
                />
                {emailTouched && !isEmailValid && (
                  <Text style={styles.errorText}>
                    Please enter a valid email address (e.g. user@example.com).
                  </Text>
                )}
              </View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  !isFormValid && styles.nextButtonDisabled,
                ]}
                onPress={handleNext}
                disabled={!isFormValid || isSubmitting}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Next"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#333333" />
                ) : (
                  <Text
                    style={[
                      styles.nextButtonText,
                      !isFormValid && styles.nextButtonTextDisabled,
                    ]}
                  >
                    Next
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 210,
    height: 48,
  },
  heroBanner: {
    backgroundColor: '#495E57',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F4CE14',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#EDEFEE',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    padding: 24,
    flex: 1,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#495E57',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#EDEFEE',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF8F8',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#F4CE14',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  nextButtonDisabled: {
    backgroundColor: '#EDEFEE',
    elevation: 0,
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  nextButtonTextDisabled: {
    color: '#AFAFAF',
  },
});
