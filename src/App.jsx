import {BrowserRouter} from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayouts'
import { Header } from './layouts/Header'
import CompaniesSection from './pages/CompaniesSection'

function App() {

  return (
      <BrowserRouter>
        <Header/>
        <MainLayout/>
        <CompaniesSection/>
      </BrowserRouter>
  )
}

export default App
