import { filterMenuItems } from '../src/utils/filtering';
import { MenuItem } from '../src/types';

const MOCK_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Greek Salad',
    description: 'The famous Greek salad with crispy lettuce, peppers, olives and our signature dressing.',
    price: 12.99,
    category: 'starters',
    image: 0,
  },
  {
    id: '2',
    name: 'Bruschetta',
    description: 'Grilled bread topped with tomatoes, garlic, basil and olive oil.',
    price: 7.99,
    category: 'starters',
    image: 0,
  },
  {
    id: '3',
    name: 'Grilled Fish',
    description: 'Fresh catch of the day with herbs, lemon and seasonal vegetables.',
    price: 20.0,
    category: 'mains',
    image: 0,
  },
  {
    id: '4',
    name: 'Pasta',
    description: 'Penne with tomato sauce, fresh chilli, garlic, basil and Parmesan.',
    price: 18.99,
    category: 'mains',
    image: 0,
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    description: 'Light and fluffy homemade Italian lemon and ricotta cake.',
    price: 6.99,
    category: 'desserts',
    image: 0,
  },
  {
    id: '6',
    name: 'Fresh Lemonade',
    description: 'Refreshing house-made lemonade with freshly squeezed lemons.',
    price: 4.5,
    category: 'drinks',
    image: 0,
  },
];

describe('filterMenuItems', () => {
  it('returns all items when category is "all" and search is empty', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'all', '');
    expect(results).toHaveLength(6);
  });

  it('filters items correctly by starters category', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'starters', '');
    expect(results).toHaveLength(2);
    expect(results.map((i) => i.name)).toEqual(['Greek Salad', 'Bruschetta']);
  });

  it('filters items correctly by mains category', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'mains', '');
    expect(results).toHaveLength(2);
    expect(results.map((i) => i.name)).toEqual(['Grilled Fish', 'Pasta']);
  });

  it('filters items correctly by desserts category', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'desserts', '');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Lemon Dessert');
  });

  it('filters items correctly by drinks category', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'drinks', '');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Fresh Lemonade');
  });

  it('filters dishes by name search (case-insensitive)', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'all', 'greek');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Greek Salad');

    const upperResults = filterMenuItems(MOCK_ITEMS, 'all', 'PASTA');
    expect(upperResults).toHaveLength(1);
    expect(upperResults[0].name).toBe('Pasta');
  });

  it('filters dishes by description keyword', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'all', 'olives');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Greek Salad');

    const lemonResults = filterMenuItems(MOCK_ITEMS, 'all', 'lemon');
    // Grilled Fish (lemon), Lemon Dessert (lemon), Fresh Lemonade (lemon)
    expect(lemonResults.length).toBeGreaterThanOrEqual(3);
  });

  it('combines category selection and search query', () => {
    // Only search within starters for garlic
    const results = filterMenuItems(MOCK_ITEMS, 'starters', 'garlic');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Bruschetta');

    // Searching for fish inside starters should yield 0 results
    const noResults = filterMenuItems(MOCK_ITEMS, 'starters', 'fish');
    expect(noResults).toHaveLength(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const results = filterMenuItems(MOCK_ITEMS, 'all', 'xyznonexistentdish');
    expect(results).toEqual([]);
  });
});
