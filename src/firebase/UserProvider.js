import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase/app';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({user: null,loading: true});

  useEffect(() => {
    const currUser = firebase.auth().onAuthStateChanged(async (user) => {

      if (user) {
        const token = await user.getIdTokenResult();
      }

      setSession({ loading: false, user});
    });

    return () => currUser();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
