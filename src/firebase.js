import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBe9fTtxdjCriJ8WZ-z1h5VEOkb3v7SsXg",
  authDomain: "clone-69cd8.firebaseapp.com",
  projectId: "clone-69cd8",
  storageBucket: "clone-69cd8.appspot.com",
  messagingSenderId: "500575618905",
  appId: "1:500575618905:web:24846809f80588433a6e48",
  measurementId: "G-0GQ8PDBQ1X",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
