import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByp2fGFjsyaQGqFSOsISIc9FgcW6KrX0A",
  authDomain: "study-ee056.firebaseapp.com",
  databaseURL: "https://study-ee056.firebaseio.com",
  projectId: "study-ee056",
  storageBucket: "study-ee056.appspot.com",
  messagingSenderId: "862408077174",
  appId: "1:862408077174:web:07c918170cfe138b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
