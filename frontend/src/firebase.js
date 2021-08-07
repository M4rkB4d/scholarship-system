import firebase from "firebase"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBkV8UKGdGKwur5i1s3hTrvd9LceXotRAE",
    authDomain: "scholarship-system.firebaseapp.com",
    databaseURL: "https://scholarship-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "scholarship-system",
    storageBucket: "scholarship-system.appspot.com",
    messagingSenderId: "1090485778654",
    appId: "1:1090485778654:web:a8b01fb7e557b57cbcea4f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const secondary = firebase.initializeApp(firebaseConfig, "Secondary");

// define variables to be imported
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
// const admin = firebase.admin();
export {auth, storage, secondary};
export default db;