import firebase from "firebase";
let firebaseConfig = {
  apiKey: "AIzaSyBrYg9mkMxWSUYCald3yIK_-XbKOs8AIzg",
  authDomain: "uploads-a728e.firebaseapp.com",
  projectId: "uploads-a728e",
  storageBucket: "uploads-a728e.appspot.com",
  messagingSenderId: "882038596193",
  appId: "1:882038596193:web:70c8eafab2d96145cc8020",
  measurementId: "G-ST5JFPBDS9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
