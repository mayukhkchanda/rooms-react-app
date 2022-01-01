import firebase from "firebase";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export { db };
