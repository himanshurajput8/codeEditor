import './Homepage2.css'
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { NavContext } from "../../ContextAPI/NavBarContext";
import { useContext, useState } from "react";
import { nanoid ,customAlphabet} from "nanoid";
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
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const nanoid = customAlphabet(alphabet,12);
      const id = nanoid();
      navigate(`/editor/${id}`);
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
            Where <span>Interviewers</span> 
            <br/>
            and <span>Developers
            <br/>  
            </span> Meet to <span>Code</span>
            <span>⚡</span>
          </h1>
          <p className="hero-subtext">
            A real-time collaborative code editor built for pair programming, interviews, and remote learning.
            No installs. No sign-ups. Just share a link and start coding.
          </p>
        </div>
        <div className="hero-container-right">
          <video
            className="custom-hero-video video1"
            autoPlay
            muted
            loop
            src="Videos/Modal_CTA.mp4"
          ></video>
        </div>
      </div>

      {/* HERO SECTION COMPLETED */}
      <ButtonGroup onShareClick={onShareClick} onBookDemo={handleDemo} />
      {showLoginModal && <LoginModal/>}
    </>
  );
};

export default Homepage2;

