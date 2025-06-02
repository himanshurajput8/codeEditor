
import React, { useContext, useState } from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { userNameContext } from '../../ContextAPI/UserNameContext';
import UserNameModal from '../ModalComponent/UserNameModal';

export const Header = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const { showModal, setShowModal } = useContext(userNameContext);

    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate('/')
    }

    const { userName } = useContext(userNameContext);

    const handleBtnClick = () => {
        setShowDropDown(!showDropDown);
    }

    const handleForModal = () => {
        setShowDropDown(false);
        setShowModal(true);
    };


    return (
        <header className="header">
            <div className="logo"
                onClick={handleGoToHome}
            >
                <img src="/curly.png" alt="" />
                Code2gthr
            </div>
            {
                userName ? (
                    <div className='header-userName-dropDown'>
                        <p>{userName}</p>
                        <button
                            onClick={() => handleBtnClick()}
                        ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></button>
                     {showDropDown && (
            <div className="dropdown">
              <p onClick={handleForModal}>Change User Name</p>
              <p>Login</p>
              <p>Sign Up</p>
            </div>
          )}
        </div>
      ) : (
        <p>Guest SignIn</p>
      )}

      {showModal && <UserNameModal />}
    </header>
  )
}