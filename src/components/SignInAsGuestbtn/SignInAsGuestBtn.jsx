import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../LoginModal/LoginModal";

export default function SignInAsGuestBtn() {
  const { isAuthPage, setShowisAuthPage } = useContext(AuthContext);

  const handleAuthPage = () => {
    setShowisAuthPage(true);
  };

  return isAuthPage ? (
    <LoginModal />
  ) : (
    <button className="guest-signin" onClick={handleAuthPage}>
      Sign In as Guest
    </button>
  );
}