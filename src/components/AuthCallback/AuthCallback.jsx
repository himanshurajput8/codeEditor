// src/routes/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase/SupabaseClient';
import trackEvents from '../../Utils/mixPanelTrackEvents'
import mixpanel from 'mixpanel-browser';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Auth error:', error);
      } else if (data.session) {
        const redirected_path = localStorage.getItem('redirected_Path') || "/";
        navigate(redirected_path); // 👈 Go to homepage
        console.log(data.session?.user?.user_metadata?.avatar_url)
        // console.log('Auth Data',data);
        mixpanel.identify(data.session.user.id);

        // ✅ Set user properties
        mixpanel.people.set({
          $name: data.session.user_metadata?.full_name ,
          $email: data.session.user.email,
          avatar_url: data.session?.user?.user_metadata?.avatar_url ||
                      data.session.user.identities?.[0]?.identity_data?.picture ||
                      data.session.user.identities?.[0]?.identity_data?.avatar_url || "",
          provider: data.session?.provider_token ? 'OAuth' : 'Unknown',
          created_at: data.session.user.created_at,
        });


        trackEvents('User Logged In', {
          user_Id: data.session.user.id,
          redirected_from: redirected_path,
        })

        trackEvents('Login Success', {
          user_id: data.session.user.id,
          redirected_from: redirected_path,
          method: 'OAuth',
        });

      }
    });
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthCallback;