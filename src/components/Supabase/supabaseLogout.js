import { supabase } from "./SupabaseClient";

const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      console.log("User logged out successfully");
      // optionally redirect or update context state here
    }
};


export default logoutUser;