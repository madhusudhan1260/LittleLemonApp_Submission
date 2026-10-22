import { MenuItem, CategoryType } from '../types';

/**
 * Filters a list of menu items based on category selection and search text.
 * Search matches against both dish name and description.
 */
export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: CategoryType,
  searchQuery: string
): MenuItem[] {
  const normalizedQuery = (searchQuery || '').trim().toLowerCase();

  return items.filter((item) => {
    // 1. Category check
    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) {
      return false;
    }

    // 2. Search query check
    if (!normalizedQuery) {
      return true;
    }

    const nameMatches = item.name.toLowerCase().includes(normalizedQuery);
    const descriptionMatches = item.description.toLowerCase().includes(normalizedQuery);

    return nameMatches || descriptionMatches;
  });
}
