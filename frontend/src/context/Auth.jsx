import { createContext, useState } from 'react';
import axios from 'axios';
import routes from '../routes';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);

  const logIn = async (username, password) => {
    const { data } = await axios.post(routes.loginPath(), {
      username,
      password,
    });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={(logIn, user)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
