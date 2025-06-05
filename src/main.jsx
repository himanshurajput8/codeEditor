import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserNameContextProvider from './ContextAPI/UserNameContext.jsx'
import {  FullScreenContextProvider } from './ContextAPI/ToggleFullScreenContext.jsx'
import {  ThemeContextProvider } from './ContextAPI/ThemeContext.jsx'
import { LanguageContextProvider } from './ContextAPI/LanguageContext.jsx'
import { NavContextProvider } from './ContextAPI/NavBarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserNameContextProvider>
      <FullScreenContextProvider>
        <ThemeContextProvider>
          <LanguageContextProvider>
            <NavContextProvider>
              <App />
            </NavContextProvider>
          </LanguageContextProvider>
        </ThemeContextProvider>
      </FullScreenContextProvider>
    </UserNameContextProvider>
  </React.StrictMode>,
)
