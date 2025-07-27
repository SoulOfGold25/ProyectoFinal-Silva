// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxO7EVutIzJ6WOVlhOLSv5GYhSB40LTfU",
    authDomain: "ecommerce-silva.firebaseapp.com",
    databaseURL: "https://ecommerce-silva-default-rtdb.firebaseio.com",
    projectId: "ecommerce-silva",
    storageBucket: "ecommerce-silva.firebasestorage.app",
    messagingSenderId: "144683239466",
    appId: "1:144683239466:web:99ca625225e0b413f89b53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
