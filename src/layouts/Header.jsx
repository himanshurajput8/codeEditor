import React, { useContext } from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { userNameContext } from '../ContextAPI/UserNameContext';

export  const  Header = ()=> {
    const navigate  = useNavigate();
    const handleGoToHome = ()=>{
        navigate('/')
    }

    const {userName} = useContext(userNameContext);

  return (
                <header className="header">
                <div className="logo"
                    onClick={handleGoToHome}
                >
                    <img src="/curly.png" alt="" />
                    CodeCollab
                </div>
                {
                    userName ? (userName): (
                        <p>Guest SignIn</p>
                    )
                }
                {/* <nav className="nav">
                    <a href="#">Pricing</a>
                    <a href="#">Sign Up</a>
                    <a href="#">Log In</a>
                </nav> */}
            </header>
  )
}
