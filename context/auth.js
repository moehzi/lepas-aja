import { useEffect, useState } from 'react';
import { InitialUserState, useUser } from './user';
import { Authentication } from '../services/Auth';
import { ACCESS_TOKEN, USER } from "../config/localStorage";
import useLocalStorage from '../hooks/useLocalStorage';

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useLocalStorage(USER, Authentication.currentUser);
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, null);
  const user = useUser();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          SetUser({ email: user.email, uid: user.uid, token: token });
          setCurrentUser(user);
          setAccessToken(token);
          // console.log(user.email);
          // console.log(user.uid);
          // console.log(token);
        });
      } else {
        SetUser(InitialUserState);
        setCurrentUser(null);
        setAccessToken(null);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default AuthStateChangeProvider;
