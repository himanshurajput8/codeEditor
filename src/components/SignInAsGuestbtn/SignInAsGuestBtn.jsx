import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../LoginModal/LoginModal";
import { LoginModalContext } from "../../ContextAPI/LoginModalContext";

export default function SignInAsGuestBtn() {
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);
  
  const {
    isAuthPage,
    setShowisAuthPage,
    isUserLogged,
    AuthUserData,
    isAuthLoading
  } = useContext(AuthContext);

  const handleAuthPage = () => {
    setShowisAuthPage(true);
    setShowLoginModal(true);
  };

  if (showLoginModal) return <LoginModal />;
  
  if (isAuthLoading) {
    return null; 
  }

  // 📍 Show login modal if auth page is triggered
  if (isAuthPage) return <LoginModal />;

  // ✅ Show avatar if logged in
  if (isUserLogged && AuthUserData) {
    return (
      <img
        src={AuthUserData.user_metadata?.avatar_url}
        alt={AuthUserData.email}
        className="user-avatar"
        style={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          objectFit: "cover"
        }}
      />
    );
  }

  // 👤 Default: show guest login button
  return (
    <button className="guest-signin" onClick={handleAuthPage}>
      <img src="/signinHeader.png" alt="" />
      Sign In as Guest
    </button>
  );
}
