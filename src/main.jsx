import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserNameContextProvider from './ContextAPI/UserNameContext.jsx'
import {  FullScreenContextProvider } from './ContextAPI/ToggleFullScreenContext.jsx'
import {  ThemeContextProvider } from './ContextAPI/ThemeContext.jsx'
import { LanguageContextProvider } from './ContextAPI/LanguageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserNameContextProvider>
      <FullScreenContextProvider>
        <ThemeContextProvider>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </ThemeContextProvider>
      </FullScreenContextProvider>
    </UserNameContextProvider>
  </React.StrictMode>,
)
