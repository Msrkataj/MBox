import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7mhpoP30ztfbvO9xN6D8ULU8Mh3eDSIo",
    authDomain: "testdrive-afbe6.firebaseapp.com",
    projectId: "testdrive-afbe6",
    storageBucket: "testdrive-afbe6.firebasestorage.app",
    messagingSenderId: "116205312021",
    appId: "1:116205312021:web:6487a2c69f1d693fce561c",
    measurementId: "G-4TC532KP1G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };