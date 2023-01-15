import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>('');

  const loginHandler = (token: string) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  const contextValue = {
    token: token,
    isLoggedIn: localStorage.getItem('token') ? true : false,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
