import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDT3rTrF38Pv0I85rN2jLkbOe30rTwurHI",
  authDomain: "conference-management-storage.firebaseapp.com",
  projectId: "conference-management-storage",
  storageBucket: "conference-management-storage.appspot.com",
  messagingSenderId: "908881323106",
  appId: "1:908881323106:web:e15b448d36bb99dca5dd3b"
};

firebase.initializeApp(firebaseConfig);
export default firebase;