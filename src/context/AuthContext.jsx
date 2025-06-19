import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuth } from '../api/client';

const AuthCtx = createContext({ user: null, setUser: () => {} });
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setUser(await checkAuth()); 
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return null;          
  return <AuthCtx.Provider value={{ user, setUser }}>{children}</AuthCtx.Provider>;
}