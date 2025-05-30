import {BrowserRouter} from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayouts'
import { Header } from './layouts/Header/Header'
import UserNameModal from './layouts/ModalComponent/UserNameModal'


function App() {

  return (
      <BrowserRouter>
        <Header/>
        <UserNameModal/>
        <MainLayout/>
      </BrowserRouter>
  )
}

export default App
