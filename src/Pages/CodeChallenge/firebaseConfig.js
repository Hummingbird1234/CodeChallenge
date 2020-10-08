import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDN2G2uwdVptwwUOHaTC-hGB6xTGeLBDVU",
  authDomain: "referall-codechallenge.firebaseapp.com",
  databaseURL: "https://referall-codechallenge.firebaseio.com",
  projectId: "referall-codechallenge",
  storageBucket: "referall-codechallenge.appspot.com",
  messagingSenderId: "659183224022",
  appId: "1:659183224022:web:4cb6da8cb57a1e8842b577",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
