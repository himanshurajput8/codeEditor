import { useContext, useState, useEffect, useRef } from 'react';
import './header2.css';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { userNameContext } from '../../ContextAPI/UserNameContext';
import UserNameModal from '../ModalComponent/UserNameModal';
import { NavContext } from '../../ContextAPI/NavBarContext';
import RecordingNavIconsHeader from '../../components/RRWEB/RecordingNavIconsHeader/RecordingNavIconsHeader';
import SignInAsGuestBtn from '../../components/SignInAsGuestbtn/SignInAsGuestBtn';
import { AuthContext } from '../../ContextAPI/AuthUser';
import logoutUser from '../../components/Supabase/supabaseLogout';
import { GifContext } from '../../ContextAPI/GifContext';

export const Header2 = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { showModal, setShowModal, userName } = useContext(userNameContext);
  const { isUserLogged, AuthUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isnav, setNav } = useContext(NavContext);
  const location = useLocation();
  const pathnameForRecordings = useLocation();
  const { showGif, setShowGif } = useContext(GifContext);
  const gifTimeoutRef = useRef(null);
  const currentPath = location.pathname.replace("/", "");
  const navItems = [
    { id: "home", label: "Home" , route : ''},
    { id: "features", label: "Features" , route : 'features'},
    { id: "contact", label: "Contact Us" , route : 'contact'},
  ];
  const dropdownRef = useRef(null);

  const isInsideEditor = location.pathname.startsWith('/editor/'); 
  

  const handleGoToHome = () => {
    navigate('/');
    setNav(true);
    setShowGif(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const toggleDropDown = () => setShowDropDown(prev => !prev);

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

  useEffect(() => {
    if (showGif) {
      gifTimeoutRef.current = setTimeout(() => {
        setShowGif(false);
      }, 5000);
    }

    return () => clearTimeout(gifTimeoutRef.current);
  }, [showGif]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className='header-main-div'>

          <div className="logo" onClick={handleGoToHome}>
            {showGif ? (
              <img src="/unscreen.gif" alt="Animated" />
            ) : (
              <img src="/unscreen2.png" alt="Static" />
            )}
            Code2gthr
          </div>
            <nav className="header-nav">
              <ul>
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className={currentPath === item.id ? "active" : ""}
                    onClick={() => navigate(`/${item.route}`)}
                  >
                    {item.label}
                  </li>
                ))}
                {isUserLogged && (
                  <li
                    className={currentPath === "sessions" ? "active" : ""}
                    onClick={() => navigate('/sessions')}
                  >
                    Sessions
                  </li>
                )}

              </ul>
            </nav>
            

          {isUserLogged ? (
            <div className="header-userName-dropDown" ref={dropdownRef}>
              <p>{AuthUserData?.user_metadata?.name || userName}</p>
              <img
                src={AuthUserData?.user_metadata?.avatar_url || AuthUserData?.user_metadata?.picture || "/default-avatar.png"}
                alt="ImgUSer"
                className="header-user-avatar"
                style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 8, cursor: 'pointer' }}
                onClick={toggleDropDown}
              />

              {showDropDown && (
                <div className="dropdown">  
                  <p
                    onClick={logoutUser}
                  >Logout</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <SignInAsGuestBtn />
            </>
          )}
        </div>
      </header>
      <div style={{ height: "12vh"}} id='home'/>
      {isInsideEditor && isUserLogged && <RecordingNavIconsHeader />}
    </>
  );
};