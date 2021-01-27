import admin from "firebase-admin";

// config firebase
const firebaseApp = admin.initializeApp({});
export const db = firebaseApp.firestore();
export default firebaseApp;
