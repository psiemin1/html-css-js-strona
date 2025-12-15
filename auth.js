import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

// login button na login.html (obsługujemy DWA możliwe selektory)
const loginBtnById = document.getElementById("login-btn");
const loginBtnByClass = document.querySelector(".google-btn");
const loginBtn = loginBtnById || loginBtnByClass;

if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/";
    } catch (err) {
      console.error("Błąd logowania:", err);
      alert("Nie udało się zalogować");
    }
  });
}

// navbar auth item (musi istnieć w każdym HTML)
const authItem = document.getElementById("auth-item");
const authLink = document.getElementById("auth-link");

onAuthStateChanged(auth, (user) => {
  if (!authItem || !authLink) return;

  if (user) {
    authLink.textContent = "Wyloguj się";
    authLink.href = "#";

    authLink.onclick = async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        window.location.reload();
      } catch (err) {
        console.error("Błąd wylogowania:", err);
        alert("Nie udało się wylogować");
      }
    };
  } else {
    authLink.textContent = "Zaloguj się";
    authLink.href = "/login.html";
    authLink.onclick = null;
  }
});
