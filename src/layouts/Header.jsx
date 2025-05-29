import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'

export  const  Header = ()=> {
    const navigate  = useNavigate();
    const handleGoToHome = ()=>{
        navigate('/')
    }
  return (
                <header className="header">
                <div className="logo"
                    onClick={handleGoToHome}
                >
                    <img src="/curly.png" alt="" />
                    CodeCollab
                </div>
                <nav className="nav">
                    <a href="#">Pricing</a>
                    <a href="#">Sign Up</a>
                    <a href="#">Log In</a>
                </nav>
            </header>
  )
}
