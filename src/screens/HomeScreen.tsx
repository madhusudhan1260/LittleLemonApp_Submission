import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, CategoryType, MenuItem } from '../types';
import { INITIAL_MENU_ITEMS } from '../data/menuItems';
import { filterMenuItems } from '../utils/filtering';
import { useProfile } from '../context/ProfileContext';
import { AppHeader } from '../components/AppHeader';
import { SearchBar } from '../components/SearchBar';
import { CategoryButton } from '../components/CategoryButton';
import { FoodItem } from '../components/FoodItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CATEGORIES: { label: string; value: CategoryType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Starters', value: 'starters' },
  { label: 'Mains', value: 'mains' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Drinks', value: 'drinks' },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { profile } = useProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const filteredItems = useMemo(() => {
    return filterMenuItems(INITIAL_MENU_ITEMS, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleCategoryPress = (category: CategoryType) => {
    Keyboard.dismiss();
    // Toggle: if already selected, clicking it can reset to 'all' or keep it selected
    if (selectedCategory === category && category !== 'all') {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderHeader = () => (
    <View style={styles.headerComponentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>

        <View style={styles.heroContentRow}>
          <Text style={styles.heroDescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          <Image
            source={require('../../assets/hero-food.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityLabel="Gourmet Mediterranean food"
          />
        </View>

        {/* Search Control */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
          placeholder="Search menu or ingredients..."
        />
      </View>

      {/* Menu Breakdown Section */}
      <View style={styles.menuBreakdownSection}>
        <Text style={styles.breakdownTitle}>ORDER FOR DELIVERY!</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat.value}
              title={cat.label}
              isSelected={selectedCategory === cat.value}
              onPress={() => handleCategoryPress(cat.value)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.divider} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={54} color="#66756F" />
      <Text style={styles.emptyTitle}>No dishes found</Text>
      <Text style={styles.emptyMessage}>
        {searchQuery
          ? `We couldn't find any dishes matching "${searchQuery}".`
          : 'No dishes available in this category.'}
      </Text>
      {(searchQuery.length > 0 || selectedCategory !== 'all') && (
        <TouchableOpacity
          style={styles.resetFilterButton}
          onPress={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
          accessibilityRole="button"
          accessibilityLabel="Reset filters"
        >
          <Text style={styles.resetFilterText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header with App Logo and Avatar */}
      <AppHeader
        showAvatar={true}
        onAvatarPress={() => navigation.navigate('Profile')}
        avatarUri={profile.avatarUri}
        firstName={profile.firstName}
        lastName={profile.lastName}
      />

      {/* Food Menu FlatList */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodItem item={item} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 24,
  },
  headerComponentContainer: {
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    backgroundColor: '#495E57',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#F4CE14',
    marginBottom: -4,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  heroContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroDescription: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#EDEFEE',
    paddingRight: 14,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  menuBreakdownSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  categoryScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEFEE',
    marginTop: 8,
    marginHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginTop: 14,
    marginBottom: 6,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#66756F',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  resetFilterButton: {
    backgroundColor: '#F4CE14',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetFilterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },
});
