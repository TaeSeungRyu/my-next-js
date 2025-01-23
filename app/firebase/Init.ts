import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"; //lite 패키지는 서버에서 사용
import { getFirestore as getFirestoreClient } from "firebase/firestore"; //클라이언트에서 사용

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
const fireStore = getFirestore(firebaseApp); //서버에서 사용할 firestore
const fireStoreClient = getFirestoreClient(firebaseApp); //클라이언트에서 사용할 firestore

export { firebaseApp, fireStore, fireStoreClient };
