import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isSelected && styles.buttonSelected]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#EDEFEE',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#495E57',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#495E57',
  },
  textSelected: {
    color: '#EDEFEE',
  },
});
