// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyCmy-1a9sYnhG_dS_hdB0IfM_I1ViAu4tA",
    authDomain: "fir-99b86.firebaseapp.com",
    projectId: "fir-99b86",
    storageBucket: "fir-99b86.appspot.com",
    messagingSenderId: "64359081462",
    appId: "1:64359081462:web:5012a7dffb8c5f570353d7",
    measurementId: "G-JWQCY30K92"
};
import { getFirestore } from 'firebase/firestore';
import {getFromDB} from "@/firebase/logic";


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
auth.onAuthStateChanged(async function(user) {
    if (user) {
        const uid = user.uid
        const userFromFirestore = await getFromDB('users', uid);
        localStorage.setItem('user', JSON.stringify(userFromFirestore));
    }
});

import { doc, onSnapshot } from "firebase/firestore";

if (localStorage.getItem('user') !== 'undefined' || localStorage.getItem('user') !== '' || localStorage.getItem('user') !== null || localStorage.getItem('user') !== undefined) {
    const user = JSON.parse(localStorage.getItem('user'))
    onSnapshot(doc(db, "users", user.uid), (userDoc) => {
        localStorage.setItem('user', JSON.stringify(userDoc))
    });
}
// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }
//
