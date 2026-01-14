// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKy-i4uiZEvbt6W0em577YptgvarkC1RE",
  authDomain: "bookhub-fc57e.firebaseapp.com",
  projectId: "bookhub-fc57e",
  storageBucket: "bookhub-fc57e.appspot.com",
  messagingSenderId: "918092821407",
  appId: "1:918092821407:web:c6013e26633730468f03aa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
