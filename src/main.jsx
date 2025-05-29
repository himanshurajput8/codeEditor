import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserNameContextProvider from './ContextAPI/UserNameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserNameContextProvider>
      <App />
    </UserNameContextProvider>
  </React.StrictMode>,
)
