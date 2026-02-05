import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { store } from "./store"
import "./index.css"

// Entry point of the React application
// This is where the app gets mounted to the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode helps find potential problems in development */}
    {/* Provider makes Redux store available to all components */}
    <Provider store={store}>
      {/* BrowserRouter enables client-side routing (no page refresh) */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
