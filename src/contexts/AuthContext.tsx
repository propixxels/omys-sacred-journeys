
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

  const checkAdminStatus = async (userEmail: string) => {
    try {
      console.log('Checking admin status for:', userEmail);
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', userEmail)
        .maybeSingle();
      
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

  // Single effect to handle all authentication
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        
        // Get initial session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        console.log('Initial session check:', { session: currentSession, error });
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Check admin status if user exists
          if (currentSession?.user?.email) {
            const adminStatus = await checkAdminStatus(currentSession.user.email);
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          } else {
            if (mounted) {
              setIsAdmin(false);
            }
          }
          
          // Set loading to false after initial check
          setLoading(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.email || 'no user');
        
        if (!mounted) return;
        
        // Update session and user immediately
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Handle admin status separately to avoid blocking
        if (newSession?.user?.email) {
          // Don't set loading here, let it handle naturally
          checkAdminStatus(newSession.user.email).then(adminStatus => {
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          }).catch(err => {
            console.error('Error checking admin status on auth change:', err);
            if (mounted) {
              setIsAdmin(false);
            }
          });
        } else {
          if (mounted) {
            setIsAdmin(false);
          }
        }
      }
    );

    // Initialize authentication
    initializeAuth();

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array - run once

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
      setLoading(true);
      await supabase.auth.signOut();
      setIsAdmin(false);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
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
