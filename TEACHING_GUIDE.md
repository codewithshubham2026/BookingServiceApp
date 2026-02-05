# ServiceFlow - Complete Teaching Guide
## From Initialization to Deployment on Vercel

**Duration:** 4-5 hours  
**Teaching Flow:** Code Explanation → Feature Explanation

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Initialization & Setup](#2-initialization--setup)
3. [Project Structure](#3-project-structure)
4. [Development Steps](#4-development-steps)
5. [Code Explanation](#5-code-explanation)
6. [Feature Explanation](#6-feature-explanation)
7. [Deployment on Vercel](#7-deployment-on-vercel)
8. [Tailwind CSS Classes Reference](#8-tailwind-css-classes-reference)

---

## 1. Project Overview

### What is ServiceFlow?
ServiceFlow is a modern booking platform built with React that allows users to:
- Browse and search services
- Filter by category, price, and rating
- Book services with a booking form
- Save favorite services
- Chat with an AI assistant
- Manage bookings

### Technology Stack
- **React 19** - UI library for building components
- **Vite** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling and validation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## 2. Initialization & Setup

### Step 1: Create a New Vite Project

```bash
npm create vite@latest booking_service_app -- --template react
cd booking_service_app
```

**Explanation:**
- `npm create vite@latest` - Uses Vite's project scaffolding tool
- `--template react` - Creates a React project with Vite configuration
- This sets up the basic React + Vite structure

### Step 2: Install Dependencies

```bash
npm install
```

**What gets installed:**
- React and React DOM (UI framework)
- Vite (build tool)
- Basic ESLint configuration

### Step 3: Install Project Dependencies

```bash
npm install react-router-dom @reduxjs/toolkit react-redux react-hook-form framer-motion lucide-react
```

**Package Breakdown:**
- `react-router-dom` - For routing between pages
- `@reduxjs/toolkit` - Redux state management (simplified)
- `react-redux` - React bindings for Redux
- `react-hook-form` - Form validation and handling
- `framer-motion` - Smooth animations
- `lucide-react` - Beautiful icon components

### Step 4: Install Dev Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**What this does:**
- Installs Tailwind CSS and its dependencies
- `-p` flag creates both `tailwind.config.js` and `postcss.config.js`

### Step 5: Configure Tailwind CSS

**tailwind.config.js:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: { /* custom brand colors */ }
      }
    }
  }
}
```

**Explanation:**
- `content` - Tells Tailwind which files to scan for classes
- `darkMode: "class"` - Enables dark mode via class toggle
- `extend` - Adds custom colors without overriding defaults

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Explanation:**
- These directives inject Tailwind's base styles, components, and utilities

### Step 6: Configure Gemini API (Optional)

**For AI Assistant Integration:**

1. **Get API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create a free API key

2. **Create `.env` file in project root:**
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_GEMINI_MODEL=gemini-2.5-flash
   ```

3. **Restart dev server** after creating `.env`:
   ```bash
   npm run dev
   ```

**How it works:**
- If API key exists → Uses Gemini 2.5 Flash (free tier)
- If API key missing → Falls back to rule-based responses
- Uses v1beta API endpoint for Gemini 2.5 models
- Includes error handling with graceful fallback

### Step 7: Start Development Server

```bash
npm run dev
```

**What happens:**
- Vite starts a dev server (usually on `http://localhost:5173`)
- Hot Module Replacement (HMR) enables instant updates
- No page refresh needed when you save files
- Environment variables from `.env` are loaded

---

## 3. Project Structure

```
booking_service_app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── assistant/   # AI chat assistant components
│   │   ├── auth/        # Authentication components
│   │   ├── booking/     # Booking-related components
│   │   ├── common/      # Shared components (EmptyState, ErrorState)
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   ├── services/    # Service listing components
│   │   └── ui/          # Reusable UI components (Button, Dropdown, etc.)
│   ├── pages/           # Page-level components
│   ├── store/           # Redux store and slices
│   ├── services/        # API service layer (mock data)
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Static JSON data
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component with routes
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

**Key Concepts:**
- **Components** - Reusable UI pieces (buttons, cards, forms)
- **Pages** - Full page views (ServicesPage, LoginPage)
- **Store** - Redux state management (global app state)
- **Services** - API calls and data fetching
- **Utils** - Helper functions (formatting, filtering)

---

## 4. Development Steps

### Phase 1: Setup & Configuration (30-45 min)

1. **Initialize project** (as shown in Section 2)
2. **Configure Tailwind CSS**
3. **Set up Redux store** (`src/store/index.js`)
4. **Set up routing** (`src/App.jsx`)

### Phase 2: Layout Components (45-60 min)

1. **Create Navbar** (`src/components/layout/Navbar.jsx`)
   - Navigation links
   - Theme toggle
   - User authentication status

2. **Create Footer** (`src/components/layout/Footer.jsx`)
   - Footer links and information

3. **Create base UI components**
   - Button (`src/components/ui/Button.jsx`)
   - Badge (`src/components/ui/Badge.jsx`)
   - Toast (`src/components/ui/Toast.jsx`)

### Phase 3: Redux Store Setup (45-60 min)

1. **Create Redux slices:**
   - `authSlice.js` - Authentication state
   - `servicesSlice.js` - Services data and filters
   - `bookingSlice.js` - Booking management
   - `favoritesSlice.js` - Favorite services
   - `uiSlice.js` - UI state (theme, modals, toasts)
   - `chatSlice.js` - AI chat state

2. **Configure store** (`src/store/index.js`)
   - Combine all reducers
   - Export store for use in app

### Phase 4: Data Layer (30-45 min)

1. **Create mock data:**
   - `src/data/services.json` - Service listings
   - `src/data/categories.js` - Service categories
   - `src/data/faqs.json` - FAQ data

2. **Create API service** (`src/services/api.js`)
   - Mock API functions that simulate backend calls
   - Functions: `getServices()`, `getServiceById()`, `postBooking()`

### Phase 5: Authentication System (45-60 min)

1. **Create auth slice** (`src/store/authSlice.js`)
   - Login/logout actions
   - User state management
   - localStorage persistence

2. **Create LoginPage** (`src/pages/LoginPage.jsx`)
   - Login form with validation
   - Password visibility toggle

3. **Create RegisterPage** (`src/pages/RegisterPage.jsx`)
   - Registration form

4. **Create ProtectedRoute** (`src/components/auth/ProtectedRoute.jsx`)
   - Route guard for authenticated pages
   - Redirects to login if not authenticated

### Phase 6: Services Listing (45-60 min)

1. **Create ServicesPage** (`src/pages/ServicesPage.jsx`)
   - Main services listing page
   - Integrates search, filters, pagination

2. **Create ServiceCard** (`src/components/services/ServiceCard.jsx`)
   - Individual service card component
   - Favorite toggle
   - Book button

3. **Create SearchBar** (`src/components/services/SearchBar.jsx`)
   - Real-time search with debouncing

4. **Create FilterBar** (`src/components/services/FilterBar.jsx`)
   - Category, price, rating filters
   - Sort options

5. **Create Pagination** (`src/components/ui/Pagination.jsx`)
   - Page navigation component

### Phase 7: Service Details (30-45 min)

1. **Create ServiceDetailsPage** (`src/pages/ServiceDetailsPage.jsx`)
   - Detailed service view
   - Image gallery
   - Related services

### Phase 8: Booking Flow (45-60 min)

1. **Create BookingModal** (`src/components/booking/BookingModal.jsx`)
   - Modal wrapper for booking form
   - Scrollable content with proper layout
   - Body scroll lock when modal is open
   - Responsive design with proper spacing

2. **Create BookingForm** (`src/components/booking/BookingForm.jsx`)
   - Form with React Hook Form
   - Two-column layout: inputs on left, date picker on right
   - Form validation with error messages

3. **Create DatePicker** (`src/components/booking/DatePicker.jsx`)
   - Custom date selection component
   - Month navigation with previous/next buttons
   - Calendar grid with day selection
   - Past date disabling

4. **Create TimePicker** (`src/components/booking/TimePicker.jsx`)
   - Custom time picker with dropdown
   - Hour selection (0-23) with scrollable list
   - Minute selection (0, 15, 30, 45) intervals
   - 12-hour format display with AM/PM
   - Styled scrollbar for hour list

5. **Create BookingSuccess** (`src/components/booking/BookingSuccess.jsx`)
   - Animated success confirmation screen
   - Green checkmark animation with scale and path drawing
   - Staggered content animations
   - "View My Bookings" button with navigation

6. **Create BookingsPage** (`src/pages/BookingsPage.jsx`)
   - User's booking history

### Phase 9: Favorites Feature (30-45 min)

1. **Create FavoritesPage** (`src/pages/FavoritesPage.jsx`)
   - List of favorited services

2. **Integrate favorites in ServiceCard**
   - Heart icon toggle
   - Persist to localStorage

### Phase 10: AI Assistant (30-45 min)

1. **Create SupportAssistant** (`src/components/assistant/SupportAssistant.jsx`)
   - Chat interface
   - AI responses (rule-based or Gemini API)

2. **Create ChatMessage** (`src/components/assistant/ChatMessage.jsx`)
   - Individual chat message component

3. **Create TypingIndicator** (`src/components/assistant/TypingIndicator.jsx`)
   - Loading animation for AI responses

### Phase 11: Polish & Testing (30-45 min)

1. **Add loading states** (skeletons)
2. **Add error states**
3. **Add empty states**
4. **Test all features**
5. **Fix any bugs**

---

## 5. Code Explanation

### 5.1 Entry Point (`src/main.jsx`)

```javascript
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { store } from "./store"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
```

**Explanation:**
- `StrictMode` - React development mode that helps find problems
- `Provider` - Makes Redux store available to all components
- `BrowserRouter` - Enables client-side routing
- `createRoot` - React 18+ way to render the app

**Teaching Points:**
- Why we wrap App with Provider and BrowserRouter
- The order matters: Provider → BrowserRouter → App

### 5.2 App Component (`src/App.jsx`)

**Key Features:**
1. **Theme Management** - Applies dark mode class to document
2. **Route Configuration** - Defines all app routes
3. **Protected Routes** - Wraps authenticated pages
4. **Global Components** - BookingModal, SupportAssistant, Toast

**BookingModal Features:**
- Scrollable modal content with proper overflow handling
- Body scroll lock when modal is open (prevents background scrolling)
- Responsive padding and spacing
- Click outside to close functionality

**Code Structure:**
```javascript
function App() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  // Fetch FAQs on mount
  useEffect(() => {
    dispatch(fetchFaqs())
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Route definitions */}
        </Routes>
      </main>
      <Footer />
      <BookingModal />
      <SupportAssistant />
      <Toast />
    </div>
  )
}
```

**Teaching Points:**
- `useEffect` for side effects (theme, data fetching)
- Route structure and protected routes
- Layout pattern (Navbar → Main → Footer)

### 5.3 Redux Store (`src/store/index.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit"
import servicesReducer from "./servicesSlice"
import bookingReducer from "./bookingSlice"
// ... other reducers

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    booking: bookingReducer,
    // ... other reducers
  },
})
```

**Explanation:**
- `configureStore` - Redux Toolkit's simplified store setup
- Each slice manages a specific part of state
- Combined into one store object

**Teaching Points:**
- Why use Redux? (global state, predictable updates)
- Slice pattern (each feature has its own slice)
- How to access state: `useSelector(selectServices)`

### 5.4 Redux Slice Example (`src/store/servicesSlice.js`)

**Structure:**
1. **Initial State** - Default values
2. **Reducers** - Pure functions that update state
3. **Async Thunks** - For API calls
4. **Selectors** - Functions to get specific state

**Key Concepts:**
- **Immutability** - Redux requires immutable updates
- **Redux Toolkit** - Uses Immer under the hood (allows "mutating" syntax)
- **Thunks** - Async actions (API calls)

### 5.5 Component Structure Example (`ServiceCard.jsx`)

**Props Pattern:**
```javascript
const ServiceCard = ({
  service,           // Data
  onBook,           // Callback function
  isFavorite,       // Boolean state
  onToggleFavorite  // Callback function
}) => { /* ... */ }
```

**Teaching Points:**
- Props vs State
- Callback functions for parent-child communication
- Conditional rendering
- Event handlers

### 5.6 Form Handling (`BookingForm.jsx`)

**React Hook Form:**
```javascript
const { register, control, handleSubmit, formState: { errors } } = useForm()

// Register input
<input {...register("name", { required: "Name is required" })} />

// Controller for custom components (DatePicker and TimePicker)
<Controller
  control={control}
  name="date"
  rules={{ required: "Date is required" }}
  render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
/>

<Controller
  control={control}
  name="time"
  rules={{ required: "Time is required" }}
  render={({ field }) => <TimePicker value={field.value} onChange={field.onChange} />}
/>
```

**Layout Structure:**
- Two-column grid layout on medium screens and up
- Left column: All input fields (name, email, phone, time, notes)
- Right column: Date picker calendar
- Responsive: Stacks vertically on mobile

**Teaching Points:**
- Why React Hook Form? (performance, less re-renders)
- `register` - Connects input to form state
- `Controller` - For custom components (DatePicker, TimePicker)
- Validation rules
- Error handling
- Responsive layout patterns
- Form organization and UX

### 5.7 Custom Hooks (`useDebounce.js`)

```javascript
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

**Teaching Points:**
- Custom hooks pattern (reusable logic)
- Debouncing concept (delay execution)
- Cleanup in useEffect (clear timeout)
- Why debounce search? (reduce API calls)

### 5.8 Custom Time Picker (`src/components/booking/TimePicker.jsx`)

**Component Structure:**
```javascript
const TimePicker = ({ value, onChange }) => {
  const [hours, setHours] = useState(9)
  const [minutes, setMinutes] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Parse time string (HH:MM format)
  const parseTimeString = (timeString) => {
    if (!timeString) return { hours: 9, minutes: 0 }
    const [hours, minutes] = timeString.split(":").map(Number)
    return { hours: hours || 9, minutes: minutes || 0 }
  }

  // Format for display (12-hour with AM/PM)
  const formatDisplayTime = (h, m) => {
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    const ampm = h >= 12 ? "PM" : "AM"
    return `${hour12}:${pad(m)} ${ampm}`
  }
}
```

**Key Features:**
- Dropdown button showing selected time
- Hour selection: Scrollable list (0-23) with max-height
- Minute selection: 15-minute intervals (0, 15, 30, 45)
- Click outside to close
- Styled scrollbar for hour list
- 12-hour format display with AM/PM

**Custom Scrollbar Styling:**
The project includes custom scrollbar styles in `src/styles/globals.css`:
```css
.scrollbar-thin {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgb(203 213 225) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px; /* Chrome, Safari, Edge */
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 3px;
}
```

**Teaching Points:**
- Custom dropdown pattern
- Time parsing and formatting
- Scrollable lists with max-height (130px)
- Custom scrollbar styling (cross-browser support)
- Click outside detection with useRef
- State management for open/close
- 12-hour format conversion

### 5.9 Modal Body Scroll Lock (`src/components/booking/BookingModal.jsx`)

**Preventing Background Scroll:**
```javascript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
  return () => {
    document.body.style.overflow = ""
  }
}, [isOpen])
```

**Modal Layout:**
```javascript
<MotionDiv className="fixed inset-0 z-40 overflow-y-auto ...">
  <div className="flex min-h-full items-start justify-center py-4 sm:items-center">
    <MotionDiv className="my-4 w-full max-w-2xl ... sm:my-8">
      {/* Modal content */}
    </MotionDiv>
  </div>
</MotionDiv>
```

**Teaching Points:**
- Body scroll lock pattern
- Scrollable modal content
- Responsive spacing (py-4 sm:py-8)
- Centering on large screens, top-aligned on mobile
- Proper z-index management

### 5.10 Animated Success Screen (`src/components/booking/BookingSuccess.jsx`)

**Animation Pattern:**
```javascript
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
>
  <motion.div
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    <CheckCircle className="h-12 w-12 text-white" />
  </motion.div>
</motion.div>
```

**Staggered Content Animation:**
```javascript
const [showContent, setShowContent] = useState(false)

useEffect(() => {
  const timer = setTimeout(() => setShowContent(true), 300)
  return () => clearTimeout(timer)
}, [])

<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
  transition={{ delay: 0.5, duration: 0.4 }}
>
```

**Teaching Points:**
- Spring animations for natural feel
- Path length animation for checkmark drawing
- Staggered animations for sequential reveal
- Navigation after success (useNavigate)
- Removing redundant buttons (only top close button)

### 5.11 Gemini API Integration (`src/services/gemini.js`)

**Environment Variables:**
```javascript
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash"
```

**API Call Pattern:**
```javascript
export const generateGeminiResponse = async ({ message, faqs, history }) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`
  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [...],
      generationConfig: { temperature: 0.4, maxOutputTokens: 220 }
    })
  })
  
  // Error handling with fallback
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Gemini API request failed: ${errorMessage}`)
  }
  
  return { answer: text, related: [...] }
}
```

**Integration in Chat Slice:**
```javascript
if (hasGeminiKey) {
  try {
    response = await generateGeminiResponse({ message, faqs, history })
  } catch {
    response = null // Fallback to rule-based
  }
}

if (!response) {
  response = getAiResponse(message, faqs) // Rule-based fallback
}
```

**Teaching Points:**
- Environment variables in Vite (`VITE_` prefix required)
- API integration with fetch
- Error handling and graceful fallback
- Context building for AI prompts
- Chat history management
- Free tier model usage (gemini-2.5-flash)

---

## 6. Feature Explanation

### 6.1 Authentication System

**Flow:**
1. User enters credentials on LoginPage
2. Form validates input
3. On submit, dispatch `login` action
4. Auth slice updates state and localStorage
5. Protected routes check authentication
6. If not authenticated, redirect to login

**Key Files:**
- `src/store/authSlice.js` - Auth state management
- `src/pages/LoginPage.jsx` - Login UI
- `src/components/auth/ProtectedRoute.jsx` - Route guard

**Teaching Points:**
- Why localStorage? (persist across sessions)
- Protected routes pattern
- Token management (in real apps, use JWT)

### 6.2 Service Listing & Filtering

**Flow:**
1. ServicesPage loads → dispatches `fetchServices()`
2. User types in search → debounced → updates filter
3. User selects category → updates filter
4. Filters change → triggers `fetchServices()` again
5. Services slice filters/sorts data
6. Pagination calculates pages
7. ServiceCard components render

**Key Features:**
- **Search** - Real-time with debouncing
- **Filters** - Category, price range, rating
- **Sorting** - Price, rating, name
- **Pagination** - Page-based navigation

**Teaching Points:**
- Client-side vs server-side filtering
- Debouncing for performance
- Pagination logic
- Loading states (skeletons)

### 6.3 Booking Flow

**Flow:**
1. User clicks "Book now" on ServiceCard
2. Checks authentication → redirects if not logged in
3. Opens BookingModal with BookingForm
4. Modal locks body scroll (prevents background scrolling)
5. User fills form with two-column layout:
   - Left: Personal info inputs (name, email, phone, time, notes)
   - Right: Date picker calendar
6. User selects time using custom TimePicker dropdown
7. On submit → dispatches `createBooking()`
8. Booking saved to Redux and localStorage
9. Shows animated success screen with green checkmark
10. User can click "View My Bookings" to navigate to bookings page
11. Modal closes

**Key Components:**
- `BookingModal.jsx` - Scrollable modal wrapper with body scroll lock
- `BookingForm.jsx` - Two-column form layout with validation
- `DatePicker.jsx` - Custom calendar with month navigation
- `TimePicker.jsx` - Custom time picker with hour/minute dropdown
- `BookingSuccess.jsx` - Animated success screen with checkmark

**Key Features:**
- **Modal Layout**: Scrollable content, proper spacing, responsive design
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Two-Column Layout**: Inputs on left, date picker on right for better UX
- **Custom Time Picker**: Dropdown with hour (0-23) and minute (15-min intervals) selection
- **Animated Success**: Green checkmark with scale and path drawing animations
- **Navigation**: Direct link to bookings page after confirmation

**Teaching Points:**
- Modal pattern (portal, focus trap, body scroll lock)
- Form validation strategies with React Hook Form
- Date and time handling
- Custom component design (DatePicker, TimePicker)
- Animation patterns with Framer Motion
- Success feedback and user flow
- Navigation after form submission

### 6.4 Favorites System

**Flow:**
1. User clicks heart icon on ServiceCard
2. Checks authentication
3. Dispatches `toggleFavorite(serviceId)`
4. Favorites slice updates state
5. Persists to localStorage
6. UI updates (filled/unfilled heart)

**Teaching Points:**
- Toggle pattern (add/remove)
- Persistence strategy
- UI feedback (visual state)

### 6.5 AI Assistant

**Flow:**
1. User opens chat assistant
2. Types question
3. Dispatches `sendChatMessage()`
4. Chat slice processes message
5. Rule-based matching or Gemini API call
6. Response added to chat history
7. Typing indicator shows while processing

**Key Features:**
- Gemini 2.5 Flash integration (free tier) - primary AI responses
- Rule-based fallback responses (FAQ matching) - when API unavailable
- Typing indicator animation
- Chat history with context
- Error handling with graceful fallback

**Teaching Points:**
- Chat UI patterns
- API integration with fallback strategy
- Loading states
- Error handling and user experience
- Environment variables for API keys
- Context building for AI prompts

### 6.6 Dark Mode

**Flow:**
1. User clicks theme toggle in Navbar
2. Dispatches `toggleTheme()`
3. UI slice updates theme state
4. App component applies "dark" class to document
5. Tailwind dark mode classes activate
6. Theme persists to localStorage

**Teaching Points:**
- CSS class-based theming
- Tailwind dark mode
- State persistence

---

## 7. Deployment on Vercel

### Step 1: Prepare for Production

**Build the project:**
```bash
npm run build
```

**What this does:**
- Vite compiles and optimizes the code
- Creates a `dist/` folder with production-ready files
- Minifies JavaScript and CSS
- Optimizes images

**Test the build locally:**
```bash
npm run preview
```

This serves the production build locally so you can test it.

### Step 2: Push to GitHub

**Initialize Git (if not already):**
```bash
git init
git add .
git commit -m "Initial commit"
```

**Create a GitHub repository:**
1. Go to GitHub.com
2. Click "New repository"
3. Name it (e.g., `booking-service-app`)
4. Don't initialize with README (we already have files)

**Push to GitHub:**
```bash
git remote add origin https://github.com/yourusername/booking-service-app.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended for beginners)**

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (easiest)

2. **Import Project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite settings

3. **Configure Project:**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Environment Variables (if using Gemini API):**
   - Go to Project Settings → Environment Variables
   - Add:
     - `VITE_GEMINI_API_KEY` = your API key
     - `VITE_GEMINI_MODEL` = `gemini-2.5-flash` (free tier model)

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Get your live URL (e.g., `booking-service-app.vercel.app`)

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? booking-service-app
# - Directory? ./
# - Override settings? No
```

### Step 4: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### Step 5: Continuous Deployment

**Automatic Deployments:**
- Every push to `main` branch → Production deployment
- Every push to other branches → Preview deployment
- Pull requests → Preview deployment with unique URL

**Manual Deployments:**
- Go to Deployments tab
- Click "Redeploy" on any deployment

### Step 6: Environment Variables in Production

**If you need environment variables:**
1. Go to Project Settings → Environment Variables
2. Add variables:
   - `VITE_GEMINI_API_KEY` (for production)
   - `VITE_GEMINI_MODEL` (for production)
3. Redeploy for changes to take effect

**Important:** 
- Vite requires `VITE_` prefix for client-side variables
- Never commit API keys to Git
- Use Vercel's environment variables for secrets

### Troubleshooting Deployment

**Common Issues:**

1. **Build fails:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Check Node.js version (Vercel uses Node 18 by default)

2. **404 on routes:**
   - Add `vercel.json` to project root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
   - This enables client-side routing

3. **Environment variables not working:**
   - Ensure `VITE_` prefix
   - Redeploy after adding variables
   - Check variable names match exactly

4. **Images not loading:**
   - Check image URLs (use absolute URLs or import)
   - Ensure images are in `public/` folder

---

## 8. Tailwind CSS Classes Reference

### Layout Classes

**Container & Spacing:**
- `container` - Centers content with max-width
- `mx-auto` - Horizontal margin auto (centers)
- `px-4` - Horizontal padding (1rem = 16px)
- `py-10` - Vertical padding (2.5rem = 40px)
- `gap-6` - Gap between flex/grid items (1.5rem)

**Flexbox:**
- `flex` - Display flex
- `flex-col` - Flex direction column
- `flex-row` - Flex direction row
- `items-center` - Align items center (vertical)
- `justify-between` - Space between (horizontal)
- `justify-center` - Center content (horizontal)
- `flex-1` - Flex grow (takes available space)

**Grid:**
- `grid` - Display grid
- `grid-cols-2` - 2 columns
- `md:grid-cols-3` - 3 columns on medium screens and up
- `gap-4` - Gap between grid items

**Positioning:**
- `relative` - Position relative
- `absolute` - Position absolute
- `fixed` - Position fixed
- `inset-0` - Top, right, bottom, left all 0
- `top-4` - Top 1rem
- `right-4` - Right 1rem

### Typography Classes

**Text Size:**
- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px)
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)

**Font Weight:**
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

**Text Color:**
- `text-slate-900` - Dark gray
- `text-slate-500` - Medium gray
- `text-white` - White
- `text-brand-600` - Custom brand color
- `text-rose-500` - Red/pink

**Text Alignment:**
- `text-center` - Center text
- `text-left` - Left align
- `text-right` - Right align

**Other:**
- `uppercase` - Uppercase text
- `tracking-widest` - Letter spacing
- `leading-tight` - Line height tight

### Color Classes

**Background:**
- `bg-white` - White background
- `bg-slate-50` - Light gray
- `bg-slate-900` - Dark gray
- `bg-brand-500` - Brand color
- `bg-gradient-to-br` - Gradient (bottom-right)
- `from-white to-slate-50` - Gradient colors

**Border:**
- `border` - 1px border
- `border-slate-100` - Light gray border
- `border-slate-800` - Dark border
- `rounded-lg` - Border radius (0.5rem)
- `rounded-xl` - Border radius (0.75rem)
- `rounded-2xl` - Border radius (1rem)
- `rounded-full` - Fully rounded (pill shape)

### Shadow Classes

- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-soft` - Custom soft shadow (defined in config)

### Dark Mode Classes

**Pattern:** `dark:class-name`
- `dark:bg-slate-900` - Dark background in dark mode
- `dark:text-white` - White text in dark mode
- `dark:border-slate-800` - Dark border in dark mode

**How it works:**
- When `<html>` has `class="dark"`, dark mode classes activate
- Controlled by theme toggle in Navbar

### Responsive Classes

**Breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

**Examples:**
- `md:grid-cols-3` - 3 columns on medium screens+
- `lg:text-4xl` - Larger text on large screens
- `md:flex-row` - Row layout on medium screens+

### State Classes

**Hover:**
- `hover:bg-slate-200` - Background on hover
- `hover:scale-105` - Scale up on hover
- `hover:-translate-y-1` - Move up on hover

**Focus:**
- `focus:ring-2` - Ring on focus
- `focus:ring-brand-500` - Brand color ring
- `focus:outline-none` - Remove default outline

**Disabled:**
- `disabled:opacity-50` - Reduce opacity when disabled
- `disabled:cursor-not-allowed` - Not-allowed cursor

### Common Patterns in This Project

**Card Pattern:**
```jsx
<div className="rounded-[28px] border border-slate-100 bg-white shadow-soft 
                dark:border-slate-800 dark:bg-slate-900">
```

**Button Pattern:**
```jsx
<button className="rounded-full bg-brand-500 px-4 py-2 text-white 
                   hover:bg-brand-600 transition">
```

**Input Pattern:**
```jsx
<input className="w-full rounded-2xl border bg-white px-3 py-2 
                  focus:ring-2 focus:ring-brand-500" />
```

**Container Pattern:**
```jsx
<div className="container mx-auto px-4 py-10">
```

---

## Teaching Tips

### For Code Explanation:
1. **Start with the big picture** - Show how components connect
2. **Explain the "why"** - Why use Redux? Why debounce?
3. **Walk through data flow** - User action → dispatch → state → UI
4. **Use examples** - Show before/after code
5. **Ask questions** - "What happens when user clicks this?"

### For Feature Explanation:
1. **Demonstrate live** - Show the feature working
2. **Break down the flow** - Step-by-step user journey
3. **Show the code** - Point to relevant files
4. **Explain edge cases** - What if user isn't logged in?
5. **Discuss alternatives** - "We could also do it this way..."

### For Tailwind Classes:
1. **Show the pattern** - Utility-first approach
2. **Explain responsive** - Mobile-first design
3. **Dark mode** - How it works
4. **Common combinations** - Card, button, input patterns
5. **Custom values** - Show tailwind.config.js

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Git
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# Vercel
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

---

## Additional Resources

- **React Docs:** https://react.dev
- **Redux Toolkit:** https://redux-toolkit.js.org
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev
- **Vercel Docs:** https://vercel.com/docs

---

**End of Teaching Guide**

Good luck with your teaching! This guide covers everything from initialization to deployment. Adjust the pace based on your students' experience level.
