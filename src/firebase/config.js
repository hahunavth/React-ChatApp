import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  // apiKey: 'AIzaSyBRpDZ63mVfrzmzTjHFjRssP4cOvw_jc04',
  // authDomain: 'chat-app-c975a.firebaseapp.com',
  // projectId: 'chat-app-c975a',
  // storageBucket: 'chat-app-c975a.appspot.com',
  // messagingSenderId: '942648297216',
  // appId: '1:942648297216:web:d8c4321ba778c8808f95e5',
  // measurementId: 'G-01WLMKYFFM',

  apiKey: "AIzaSyBMckRZQtEsbti4To5Nrf-ZoGOpA2MROEM",
  authDomain: "chat-app-67a8b.firebaseapp.com",
  databaseURL:
    "https://chat-app-67a8b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-67a8b",
  storageBucket: "chat-app-67a8b.appspot.com",
  messagingSenderId: "550759354703",
  appId: "1:550759354703:web:e08640596dccf3b917f53a",
  measurementId: "G-PL5J35GXWF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
