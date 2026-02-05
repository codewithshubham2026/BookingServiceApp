import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import BookingModal from "./components/booking/BookingModal"
import SupportAssistant from "./components/assistant/SupportAssistant"
import Toast from "./components/ui/Toast"
import ScrollToTop from "./components/ui/ScrollToTop"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetailsPage from "./pages/ServiceDetailsPage"
import BookingsPage from "./pages/BookingsPage"
import FavoritesPage from "./pages/FavoritesPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { selectTheme } from "./store/uiSlice"
import { fetchFaqs } from "./store/chatSlice"

function App() {
  // Hooks to interact with Redux store
  const dispatch = useDispatch() // To dispatch actions
  const theme = useSelector(selectTheme) // Get current theme

  // Apply theme to document element and persist to localStorage
  // This effect runs whenever theme changes
  useEffect(() => {
    // Toggle "dark" class on <html> element for Tailwind dark mode
    document.documentElement.classList.toggle("dark", theme === "dark")
    // Save theme preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme]) // Dependency: re-run when theme changes

  // Fetch FAQs when app loads (only once)
  useEffect(() => {
    dispatch(fetchFaqs())
  }, [dispatch]) // Empty dependency array would be better, but ESLint wants dispatch

  return (
    // Flexbox layout: min-h-screen ensures full height, flex-col stacks vertically
    <div className="flex min-h-screen flex-col">
      {/* ScrollToTop: Scrolls to top on route change */}
      <ScrollToTop />
      {/* Navbar: Always visible at top */}
      <Navbar />
      {/* Main content area: flex-1 makes it take remaining space */}
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ServicesPage />} />
          {/* :id is a URL parameter (e.g., /services/123) */}
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          
          {/* Protected routes - require authentication */}
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Catch-all route: matches any path not defined above */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* Footer: Always visible at bottom */}
      <Footer />
      
      {/* Global components: rendered outside main content */}
      <BookingModal /> {/* Modal for booking form */}
      <SupportAssistant /> {/* AI chat assistant */}
      <Toast /> {/* Toast notifications */}
    </div>
  )
}

export default App
