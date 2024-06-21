import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'app/config/firebase';  // Adjust the import path as necessary
import { claimToken } from '../apis/userApi';

// Axios Instance
import instance from 'app/apis';  // Adjust the import path as necessary

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        instance.defaults.headers.common.Authorization = `Bearer ${user?.accessToken}`
        await claimToken();
        localStorage.setItem('access_token', user.accessToken);
      } else {
        setUser(null);
        localStorage.removeItem('access_token');

      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential
    } catch(e) {
      console.error('Login Error: ', e.message);
    }
  };

  const register = async (email: string, password: string, name: string, bio: string, role: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      // Save user info to Firestore
      await setDoc(doc(db, 'USERS', user.uid), {
        email: user.email,
        name,
        bio,
        role,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&s',
        company: 'eBuddy PTE LTD',
        occupation: 'eBuddy Developer'
      });
      return response;
    } catch(e) {
      console.error('Registration Error: ', e.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect after logout
    } catch(e) {
      console.error('Logout Error: ', e.message);
    }
  };

  return {
    user,
    login,
    register,
    logout,
  };
}
