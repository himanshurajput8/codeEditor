// src/routes/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase/SupabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Auth error:', error);
      } else if (data.session) {
        console.log('Signed in!');
        navigate('/'); // 👈 Go to homepage
      }
    });
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthCallback;
