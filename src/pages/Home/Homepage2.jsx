import './Homepage2.css'
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { NavContext } from "../../ContextAPI/NavBarContext";
import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../../components/LoginModal/LoginModal";
import { LoginModalContext } from '../../ContextAPI/LoginModalContext'
import ButtonGroup from "../../NEWTHEME/ButtonGroup/ButtonGroup";

const Homepage2 = () => {
  const navigate = useNavigate();
  const { isUserLogged } = useContext(AuthContext);
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const onShareClick = () => {
    if (isUserLogged) {
      const id = nanoid(12);
      navigate(`${id}`);
    }
    else {
      setShowLoginModal(true)
    }
  };

  const handleDemo = () => {
    console.log(document.body);
    
  }
  return (
    <>
      <div className="hero-container" id='headerId-Div'>
        <div className="hero-container-left">

          <h1 className="hero-title" >
            Where <span>Interviewers</span> and <span>Developers</span> Meet to <span>Code</span>
            <br />
            <span>⚡</span>
          </h1>
        </div>

        <div className="hero-container-right">
          <p className="hero-subtext">
            A real-time collaborative code editor built for pair programming, interviews, and remote learning.
            No installs. No sign-ups. Just share a link and start coding.
          </p>
        </div>
      </div>

      {/* HERO SECTION COMPLETED */}
      <ButtonGroup onShareClick={onShareClick} onBookDemo={handleDemo}/>
    </>
  );
};

export default Homepage2;

