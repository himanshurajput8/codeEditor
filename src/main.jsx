import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserNameContextProvider from './ContextAPI/UserNameContext.jsx'
import { FullScreenContext, FullScreenContextProvider } from './ContextAPI/ToggleFullScreenContext.jsx'
import { ThemeContext, ThemeContextProvider } from './ContextAPI/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserNameContextProvider>
      <FullScreenContextProvider>
        <ThemeContextProvider>
        <App />
        </ThemeContextProvider>
      </FullScreenContextProvider>
    </UserNameContextProvider>
  </React.StrictMode>,
)
