import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBAxMS7dPzuOVDJhbKbDVXUN4fEnNBd5vg",
    authDomain: "sandesham-86646.firebaseapp.com",
    projectId: "sandesham-86646",
    storageBucket: "sandesham-86646.appspot.com",
    messagingSenderId: "1038780372627",
    appId: "1:1038780372627:web:779091cc43a84bd6571f66",
    measurementId: "G-NR1KLWPLZC"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebaseApp.auth();
  const provider =new firebase.auth.GoogleAuthProvider();
  export {auth,provider}
  export default db; 