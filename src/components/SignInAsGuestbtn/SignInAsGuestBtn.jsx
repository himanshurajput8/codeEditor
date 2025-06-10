import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../LoginModal/LoginModal";

export default function SignInAsGuestBtn() {
  const {
    isAuthPage,
    setShowisAuthPage,
    isUserLogged,
    AuthUserData,
    isAuthLoading
  } = useContext(AuthContext);

  console.log("Auth status:", { isUserLogged, AuthUserData, isAuthLoading });

  const handleAuthPage = () => {
    setShowisAuthPage(true);
  };

  
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
      Sign In as Guest
    </button>
  );
}
