import React, { useContext, useEffect } from 'react';
import './LoginModal.css';
import { supabase } from '../Supabase/SupabaseClient';
import { AuthContext } from '../../ContextAPI/AuthUser';
import { LoginModalContext } from '../../ContextAPI/LoginModalContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import trackEvents from '../../Utils/mixPanelTrackEvents';
import { IoMdCloseCircle } from "react-icons/io";

export default function LoginModal() {
    const redirectTo = window.location.origin + '/auth/callback';
    const { setShowLoginModal } = useContext(LoginModalContext);
    const { setAuthUserData } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(() => {
    //     if(location?.state?.from?.pathname){
    //         const redirectedPath = location?.state?.from?.pathname || '/';
    //         localStorage.setItem('redirected_Path', redirectedPath);
    //     }
    // }, []);


    useEffect(() => {
        trackEvents("Login Modal Triggered", {
            source: location?.state?.from?.pathname || "unknown",
            redirected: !!location?.state?.from,
        });
    }, []);


    const handleGoogleAuthentication = async () => {
        trackEvents("Login Attempt - Google", {
            provider: "google",
        });
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo,
                },
            });
            // console.log("Google Auth Response:", data);
            if (error) throw error;
        } catch (err) {
            console.error("Google Auth Error:", err.message);
        }
    };


    const handleGithubAuthentication = async () => {
        trackEvents("Login Attempt - Github", {
            provider: "Github",
        });
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo
                }
            });
            console.log("Github Auth Response:", data);
            if (error) throw error;
        } catch (err) {
            console.error("Github Auth Error:", err.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('In try block');
                const { data, error } = await supabase.auth.getUser();
                if (error) throw error;
                if (data?.user) {
                    setAuthUserData(data.user);
                    console.log('Done');
                }
            } catch (err) {
                console.error("Error fetching user:", err.message);
            }
        };

        fetchUser();
    }, [setAuthUserData]);

    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-left">
                    <img className="modal-logo" src="/unscreen.gif" alt="Logo" />

                    <h1 className="modal-title">Sign up for CodeTogether</h1>
                    <p className="modal-subtitle">Get started with $300 free monthly !</p>

                    <div className="modal-buttons">
                        <button className="modal-btn outline"
                            onClick={handleGithubAuthentication}
                        >
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                alt="GitHub"
                            />
                            Continue with GitHub
                        </button>
                        <button className="modal-btn outline"
                            onClick={handleGoogleAuthentication}
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                            />
                            Continue with Google
                        </button>
                    </div>

                    <button className="modal-text-link"
                        onClick={() => {
                            trackEvents("Try Playground Clicked", {
                                from: "Login Modal",
                            });
                        }}
                    >
                        Try the playground first <span>→</span>
                    </button>

                    <div className="modal-footer">
                        <p>
                            By proceeding, you agree to our <a href="#">terms of service</a>.
                        </p>
                        <p>
                            Already have an account? <a href="#">Log in</a>
                        </p>
                    </div>
                </div>

                <div className="modal-right">
                    <img src="/LoginModalRightImg.webp" alt="Code Graphic" />
                </div>

                <div className='close-modal-div'>
                <button
                    className='close-modal-btn'
                    onClick={()=>{
                        navigate(location?.state?.from?.pathname || "/");
                        trackEvents("Login Modal Closed Without Logging", {
                            from: "Login Modal",
                            source: location?.state?.from?.pathname || "unknown",
                        });
                    }}
                    >
                    <IoMdCloseCircle/>
                </button>
                    </div>
            </div>
        </>
    );
}