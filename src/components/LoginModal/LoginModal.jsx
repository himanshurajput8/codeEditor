import React, { useContext, useEffect } from 'react';
import './LoginModal.css';
import { supabase } from '../Supabase/SupabaseClient';
import { AuthContext } from '../../ContextAPI/AuthUser';
import { log } from 'socket.io-client/dist/socket.io.js';

export default function LoginModal() {

    const { AuthUserData, setAuthUserData ,setShowisAuthPage} = useContext(AuthContext);

    const handleGoogleAuthentication = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            console.log("Google Auth Response:", data);
            if (error) throw error;
        } catch (err) {
            console.error("Google Auth Error:", err.message);
        }
    };

    const handleGithubAuthentication = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
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

    const handleLoginModalToFalse = () => {
        setShowisAuthPage(false);
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h1>Welcome to</h1>
                <h1>Code2gthr</h1>
                <p>Please sign in to continue</p>

                <div className="btn-group">
                    <button className="oauth-btn github"
                        onClick={handleGithubAuthentication}
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            alt="GitHub"
                        />
                        Sign In With GitHub
                    </button>

                    <button className="oauth-btn google" 
                        onClick={handleGoogleAuthentication}>
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                        />
                        Sign In With Google
                    </button>
                </div>

                <button className="cancel-btn"
                    onClick={handleLoginModalToFalse}
                >Cancel</button>
            </div>
        </div>
    );
}