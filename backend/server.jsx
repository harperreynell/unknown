import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, doc, signInWithEmailAndPassword, createUserWithEmailAndPassword, getFirestore, collection, getDocs, addDoc, getDoc };