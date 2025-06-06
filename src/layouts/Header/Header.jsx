import React, { useContext, useState, useEffect, useRef } from 'react';
import './header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { userNameContext } from '../../ContextAPI/UserNameContext';
import UserNameModal from '../ModalComponent/UserNameModal';
import { NavContext } from '../../ContextAPI/NavBarContext';
import { startRecording, stopRecording, replayRecording } from '../../components/RRWEB/rrwebFunctions';
import { RrwebContext } from '../../ContextAPI/RrwebContext';
import RrwebReplayModal from '../../components/RRWEB/Rrweb';
import RecordingNavIconsHeader from '../../components/RRWEB/RecordingNavIconsHeader/RecordingNavIconsHeader';

export const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { showModal, setShowModal, userName } = useContext(userNameContext);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isnav, setNav } = useContext(NavContext);
  const { recording, setRecording, stopFnRef, replayerContainerRef } = useContext(RrwebContext);
  const [showReplayModal, setShowReplayModal] = useState(false);
  const locationPath='';

  const location = useLocation();
  console.log('location', location.pathname);
  

  useEffect(() => {
    if (location.pathname.includes('/room')) {
      setNav(false);
    } else {
      setNav(true);
    }
  }, [location.pathname, setNav]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "contact", label: "Contact Us" }
  ];

  const dropdownRef = useRef(null);

  const handleGoToHome = () => {
    navigate('/');
    setNav(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const toggleDropDown = () => setShowDropDown(prev => !prev);

  const openUserNameModal = () => {
    setShowDropDown(false);
    setShowModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRecord = () => {
    startRecording(stopFnRef);
    setRecording(true);
  };

  const handleStop = () => {
    stopRecording(stopFnRef);
    setRecording(false);
  };

  const handleReplay = () => {
    setShowReplayModal(true);
  };

  return (
    <>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={handleGoToHome}>
          <img src="/curly1.jpeg" alt="logo" />
          Code2gthr
        </div>

        {isnav ? (
          <nav className="header-nav">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={activeLink === item.id ? "active" : ""}
                  onClick={() => setActiveLink(item.id)}
                >
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          // <div>
          //   {!recording ? (
          //     <button onClick={handleRecord}>Start Recording</button>
          //   ) : (
          //     <button onClick={handleStop}>Stop Recording</button>
          //   )}
          //   <button onClick={handleReplay}>Replay</button>
          // </div>
          <RecordingNavIconsHeader />
        )}

        {userName ? (
          <div className="header-userName-dropDown" ref={dropdownRef}>
            <p>{userName}</p>
            <button
              onClick={toggleDropDown}
              aria-haspopup="true"
              aria-expanded={showDropDown}
              aria-label="User menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
            {showDropDown && (
              <div className="dropdown">
                <p onClick={openUserNameModal}>Change User Name</p>
                <p >Login</p>
                <p >Sign Up</p>
              </div>
            )}
          </div>
        ) : (
          <button className="guest-signin">
            Sign In as Guest
          </button>
        )}

        {showModal && <UserNameModal />}
      </header>

      <div style={{ height: "10vh" }} id='home' />

    </>
  );
};
