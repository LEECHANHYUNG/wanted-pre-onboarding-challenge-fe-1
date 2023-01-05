import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  const contextValue = {
    token: token,
    isLoggedIn: localStorage.getItem('token'),
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
