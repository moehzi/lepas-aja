// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBi2tNgLucv8amFPp9vCXJcM03kITvXtc4',
  authDomain: 'lepas-aja.firebaseapp.com',
  projectId: 'lepas-aja',
  storageBucket: 'lepas-aja.appspot.com',
  messagingSenderId: '472438318678',
  appId: '1:472438318678:web:4ae14c27206c60238afdf7',
  measurementId: 'G-79MSWQG7JC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
