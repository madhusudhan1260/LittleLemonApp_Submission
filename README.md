# Little Lemon Food Ordering App — React Native Capstone

A complete, production-ready, professional mobile application for **Little Lemon Mediterranean Restaurant**, designed and engineered to satisfy all requirements of the React Native Capstone peer-graded assignment.

Built with **React Native**, **Expo SDK 57**, **TypeScript**, and **React Navigation Native Stack**, targeting both **iOS** and **Android**.

---

## 📱 App Overview & Screenshots Structure

The Little Lemon mobile app delivers a Mediterranean restaurant experience adhering to the official brand guidelines and Coursera capstone specifications:

1. **Onboarding Screen**: Welcomes first-time customers, collects first name and email with real-time validation, disables progress until inputs are valid, and persists user state.
2. **Home Screen**: 
   - **Header**: Little Lemon logo and circular profile avatar navigating to Profile.
   - **Hero Section**: Dark green (`#495E57`) hero banner featuring "Little Lemon", "Chicago", brand narrative, Mediterranean culinary imagery, and interactive search bar.
   - **Menu Breakdown**: "ORDER FOR DELIVERY!" category selector (All, Starters, Mains, Desserts, Drinks) with active pill styling.
   - **Food Menu List**: Performant `FlatList` with dish name, description, formatted price, thumbnail image, graceful fallback, and empty search results handling.
3. **Profile Screen**: 
   - Complete personal information manager (First name, Last name, Email, Phone number with auto-formatting).
   - Avatar management (Change photo presets, Remove photo, Initials generation fallback).
   - Working email notification checkboxes (Order statuses, Password changes, Special offers, Newsletter).
   - Confirmed Log Out (wipes stored data and resets to Onboarding).
   - Discard changes (restores last saved data).
   - Save changes (persists updates to AsyncStorage and syncs across the app).

---

## 🎨 Brand Design & Color Palette

- **Dark Green**: `#495E57` (Primary brand color, hero background, active buttons)
- **Lemon Yellow**: `#F4CE14` (Brand accent, primary call-to-actions, hero highlights)
- **Salmon Accent**: `#EE9972` (Secondary accent, subtle borders)
- **Light Gray**: `#EDEFEE` (Secondary background, unselected category pills, inputs)
- **Body Text**: `#333333` (High readability text)
- **Secondary Text**: `#66756F` (Subtitles, descriptions, placeholders)
- **Card/Surface White**: `#FFFFFF` (Clean background surfaces)

---

## 📂 Project Architecture

```text
LittleLemonApp/
├── App.tsx                        # App root with SafeAreaProvider, ProfileProvider, StatusBar
├── app.json                       # Expo configuration (iOS & Android bundle IDs, splash, icons)
├── package.json                   # Dependencies, scripts (test, type-check, start)
├── tsconfig.json                  # TypeScript strict compiler configuration
├── jest.config.js                 # Jest unit testing configuration with ts-jest
├── README.md                      # Comprehensive documentation and review guide
├── assets/
│   ├── logo.png                   # High-res Little Lemon brand logo
│   ├── hero-food.jpg              # High-quality Mediterranean hero platter
│   ├── icon.png                   # Branded app icon
│   ├── splash-icon.png            # Branded splash screen
│   └── menu/                      # Menu item photographs
│       ├── greek-salad.jpg
│       ├── bruschetta.jpg
│       ├── grilled-fish.jpg
│       ├── pasta.jpg
│       ├── lemon-dessert.jpg
│       └── lemonade.jpg
├── wireframes/
│   └── little-lemon-wireframe.jpg # 3-Screen UI/UX wireframe deliverable
├── src/
│   ├── components/
│   │   ├── AppHeader.tsx          # Universal header (Logo, Back button, Avatar)
│   │   ├── Avatar.tsx             # Photo and initials avatar component
│   │   ├── CategoryButton.tsx     # Menu category filter pill
│   │   ├── FoodItem.tsx           # Menu item row with image and fallback
│   │   └── SearchBar.tsx          # Real-time search input with clear button
│   ├── context/
│   │   └── ProfileContext.tsx     # Global profile state and synchronization
│   ├── data/
│   │   └── menuItems.ts           # Little Lemon menu dataset
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Native Stack navigation with splash loading state
│   ├── screens/
│   │   ├── OnboardingScreen.tsx   # Screen 1: First-launch onboarding & validation
│   │   ├── HomeScreen.tsx         # Screen 2: Hero, search, categories, food list
│   │   └── ProfileScreen.tsx      # Screen 3: Editable profile & notifications
│   ├── storage/
│   │   └── storage.ts             # Centralized AsyncStorage persistent service
│   ├── types/
│   │   └── index.ts               # Core TypeScript interfaces & types
│   └── utils/
│       ├── filtering.ts           # Category and search filtering logic
│       └── validation.ts          # Email, name, phone, and initials utilities
└── __tests__/
    ├── filtering.test.ts          # 9 unit tests for menu filtering
    ├── storage.test.ts            # 7 unit tests for storage persistence & logout
    └── validation.test.ts         # 16 unit tests for input validations
```

---

## 🖼️ Wireframe Deliverable

As required by the assignment specification, a separate UX wireframe image has been produced before implementation and is stored in the repository at:

📁 **`wireframes/little-lemon-wireframe.jpg`**

It illustrates the low-fidelity architecture and component placement for:
- **Screen 1**: Onboarding Wireframe (Header, welcome banner, validated input fields, disabled/enabled Next button).
- **Screen 2**: Home Wireframe (Header with avatar, dark green hero with description & food image, search control, horizontal category pills, vertical menu list).
- **Screen 3**: Profile Wireframe (Header with back button, avatar edit controls, first/last name, email, phone number, email notification checkboxes, logout button, discard & save action buttons).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended; developed on Node v24)
- **npm** (v9 or higher)
- **Expo Go** app on your physical iOS/Android device OR Xcode iOS Simulator / Android Studio Emulator

### 1. Installation

Clone or extract the repository and install the dependencies:

```bash
cd LittleLemonApp
npm install
```

### 2. Run the App

Start the Expo development server:

```bash
npx expo start
```

From the interactive terminal prompt:
- Press **`i`** to open in the **iOS Simulator** (requires macOS and Xcode).
- Press **`a`** to open in the **Android Emulator** (requires Android Studio).
- Press **`w`** to open in the **Web browser**.
- Or scan the displayed QR code using the **Expo Go** app on your iPhone or Android phone.

---

## 🧪 Testing & Verification

The project includes an automated test suite verifying validation logic, filtering algorithms, and storage mechanisms.

### Run Unit Tests
```bash
npm test
```
**Results:** 32 passing tests across 3 suites (`validation.test.ts`, `filtering.test.ts`, `storage.test.ts`).

### Run TypeScript Verification
```bash
npm run type-check
```
**Results:** 0 type errors with strict type checking.

### Verify Native Metro Bundling
```bash
npx expo export --output-dir /tmp/test-export
```
**Results:** Bundled 100% of modules cleanly for both iOS and Android.

---

## 📋 Rubric & Criterion Checklist

| # | Peer Review Criterion | Implementation Status | Details |
|---|---|:---:|---|
| 1 | First launch opens onboarding | ✅ Verified | Root stack checks AsyncStorage; defaults to Onboarding when no saved profile is detected. |
| 2 | Next is disabled when required details missing | ✅ Verified | Next button disabled visually and functionally until both valid first name and email are provided. |
| 3 | Invalid email is rejected | ✅ Verified | Regex validation checks standard email formats with helpful inline error alerts. |
| 4 | Valid onboarding navigates to Home | ✅ Verified | Tapping Next writes profile and onboarding flag to AsyncStorage and switches route to Home. |
| 5 | Returning launches open Home | ✅ Verified | When onboarding is marked complete in AsyncStorage, app opens directly on Home without flicker. |
| 6 | Home displays Header, Hero, Categories, Food List | ✅ Verified | Header with logo and avatar, dark green hero with Chicago subheading, food photo, search bar, category pills, and FlatList. |
| 7 | Search filters the menu correctly | ✅ Verified | Filters dishes in real time by name and description with clear button and friendly empty state. |
| 8 | Category buttons filter the menu | ✅ Verified | Selectable pills filter by Starters, Mains, Desserts, Drinks, or All. |
| 9 | Every menu item displays name, desc, price, image | ✅ Verified | Formatted price (`$XX.XX`), description, high-res thumbnail with graceful fallback icon. |
| 10 | Profile loads saved onboarding details | ✅ Verified | First name and email are pre-populated into Profile inputs from Onboarding. |
| 11 | Profile edits save successfully | ✅ Verified | Saves first name, last name, email, phone number, and avatar to AsyncStorage with success notification. |
| 12 | Profile changes survive app restart | ✅ Verified | Stored in AsyncStorage and reloaded on launch into React context. |
| 13 | Discard changes restores saved values | ✅ Verified | Restores fields to last-saved profile without modifying or wiping AsyncStorage. |
| 14 | Log out clears user information | ✅ Verified | Confirms via modal, wipes `@little_lemon_profile`, `@little_lemon_onboarding_completed`, `@little_lemon_notifications`, and resets to Onboarding. |
| 15 | Back navigation works correctly | ✅ Verified | Profile back button and Android hardware back return to Home. |
| 16 | Cross-platform iOS & Android compatibility | ✅ Verified | Styled with flexbox, SafeAreaProvider, cross-platform inputs, and verified Expo Hermes bundle exports. |

---

## 📦 Creating the Submission ZIP

To package the project for peer grading submission without `node_modules` or local caches:

```bash
cd LittleLemonApp
zip -r ../LittleLemonApp_Submission.zip . -x "node_modules/*" ".git/*" ".expo/*" "coverage/*" "*.zip"
```

---

## 🐙 Git Submission Commands

To commit and push all project files and the wireframe to your GitHub repository:

```bash
git add .
git commit -m "feat: complete Little Lemon food ordering app with onboarding, home, profile, wireframes, and tests"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
