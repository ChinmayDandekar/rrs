import { initializeApp } from "firebase/app";


import {
    updateProfile,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCn1Gf_2UrmO2kGbODJMjzqyVyXl1-kfuM",
    authDomain: "recipe-recommendation-sy-e21de.firebaseapp.com",
    projectId: "recipe-recommendation-sy-e21de",
    storageBucket: "recipe-recommendation-sy-e21de.appspot.com",
    messagingSenderId: "138344380040",
    appId: "1:138344380040:web:5975d01ff0b81eb936513d",
    measurementId: "G-5ZEQ0M6HHN"
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};
  
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        if (userCredential.user) {
          updateProfile( userCredential.user, {displayName: name})
        }
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};
  
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};
  
const logout = () => {
    signOut(auth);
};
  
export {
    app,
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };