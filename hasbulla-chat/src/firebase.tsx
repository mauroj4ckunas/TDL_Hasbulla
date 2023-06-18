// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzGZ0-owUYWeUdFbfNCLBNQydJfbg6Vyk",
  authDomain: "hasbulla-aa6d6.firebaseapp.com",
  projectId: "hasbulla-aa6d6",
  storageBucket: "hasbulla-aa6d6.appspot.com",
  messagingSenderId: "882559915520",
  appId: "1:882559915520:web:1997724a6b127e56162ae5",
  measurementId: "G-G9VS42G32Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "HasbullApp");
export const db: Firestore = getFirestore(app);

let getMensajes = async (db: Firestore) => {
  const mensajesCol = collection(db, 'mensajes');
  const mensajesSnapshot = await getDocs(mensajesCol);
  const mensajesList = mensajesSnapshot.docs.map(doc => doc.data());
  return mensajesList;
}
