import firebase from 'firebase/app';
import auth from 'firebase/auth';

export const AuthService = {
  loginWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const userCred = await firebase.auth().signInWithPopup(provider);
      return {
        user: userCred,
      };
    } catch (e) {
      error: e.message;
    }
  },
  createUser: async (email, password) => {
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return {
        user: userCred,
      };
    } catch (e) {
      error: e.message;
    }
  },
  loginWithPassword: async (email, password) => {
    try {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return { user: userCred };
    } catch (e) {
      error: e.message;
    }
  },
  logout: async () => {
    await firebase.auth().signOut();
  },
};
