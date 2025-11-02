import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@EquipApp:user');
    const storedToken = localStorage.getItem('@EquipApp:token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://trabalho-teste-production.up.railway.app/api/auth/login', {
        email,
        password
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('@EquipApp:user', JSON.stringify(user));
      localStorage.setItem('@EquipApp:token', token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('https://trabalho-teste-production.up.railway.app/api/auth/register', {
        name,
        email,
        password
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('@EquipApp:user', JSON.stringify(user));
      localStorage.setItem('@EquipApp:token', token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('@EquipApp:user');
    localStorage.removeItem('@EquipApp:token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};