import { useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';
import { createUser } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  const login = (email: string) => {
    const newUser = createUser(email);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setStatus('authenticated');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setStatus('unauthenticated');
  };

  return { user, status, login, logout };
}