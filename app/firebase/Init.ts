import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_APIKEY,
  authDomain: process.env.FIRE_BASE_AUTHDOMAIN,
  projectId: process.env.FIRE_BASE_PROJECTID,
  storageBucket: process.env.FIRE_BASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRE_BASE_MESSAGINGSENDERID,
  appId: process.env.FIRE_BASE_APPID,
  measurementId: process.env.FIRE_BASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebaseApp);

export { firebaseApp, fireStore };
