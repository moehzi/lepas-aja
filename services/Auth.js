import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { app } from '../config/firebase.config';
import { ACCESS_TOKEN, USER } from '../config/localStorage';

export const FirebaseAuth = getAuth(app);

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignUp = async (email, password) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
  Authentication().onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        await postRegister(token);
      });
    }
  });
};

const postRegister = async (token) => {
  let response = await axios.post(
    `https://lepasaja-backend.herokuapp.com/api/v1/register`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export function getAccessToken() {
  try {
    return `Bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN) || "null")}`;
  } catch {
    return null;
  }
}

export function getUIDUser(){
  try {
    // return JSON.parse(localStorage.getItem(USER))
    return (JSON.parse(localStorage.getItem(USER)).uid);
  } catch {
    console.log('error');
    return null;
  }
}

export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
  Authentication().onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        console.log(token);
        // await postRegister(token);
      });
    }
  });
};

export const logout = async () => {
  await signOut(FirebaseAuth);
};

export const GoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(FirebaseAuth, provider);
  Authentication().onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        console.log(token);
        await postRegister(token);
      });
    }
  });
};

export const FacebookAuth = async () => {
  const provider = new FacebookAuthProvider();
  await signInWithPopup(FirebaseAuth, provider);
};

export const GetSignInErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Email tidak terdaftar';
    case 'auth/wrong-password':
    default:
      return 'Email atau password salah';
  }
};

export const sendEmailResetPassword = async(email) => {
  await sendPasswordResetEmail(FirebaseAuth, email);
}

export const sendResetPassword = async(oobCode, newPassword) => {
  await confirmPasswordReset(FirebaseAuth, oobCode, newPassword);
}