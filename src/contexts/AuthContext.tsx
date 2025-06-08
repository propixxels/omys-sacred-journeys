
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const checkAdminStatus = async (userEmail: string) => {
    try {
      console.log('Checking admin status for:', userEmail);
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', userEmail)
        .single();
      
      console.log('Admin check result:', { data, error });
      
      if (error) {
        console.log('Admin check error:', error);
        return false;
      }
      
      return !!data;
    } catch (err) {
      console.error('Error checking admin status:', err);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
        } else {
          console.log('Initial session:', initialSession);
          
          if (mounted) {
            setSession(initialSession);
            setUser(initialSession?.user ?? null);
            
            if (initialSession?.user?.email) {
              const adminStatus = await checkAdminStatus(initialSession.user.email);
              setIsAdmin(adminStatus);
            } else {
              setIsAdmin(false);
            }
          }
        }
        
        if (mounted) {
          setInitialized(true);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        if (mounted) {
          setInitialized(true);
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          const adminStatus = await checkAdminStatus(session.user.email);
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
        
        // Only set loading to false after initialization is complete
        if (initialized) {
          setLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [initialized]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log('Sign in result:', { error });
      return { error };
    } catch (err) {
      console.error('Sign in error:', err);
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAdmin,
      loading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
