import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const googleBtn = document.querySelector(".google-btn");

// Logowanie Google
if (googleBtn) {
  googleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Zalogowano!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Błąd logowania:", error);
      });
  });
}

// Obsługa UI i wylogowania
onAuthStateChanged(auth, (user) => {
  const loginBtn = document.querySelector(".navbar__btn");

  if (user) {
    loginBtn.innerHTML = `<button id="logout-btn" class="button">Wyloguj</button>`;
    const logoutBtn = document.querySelector("#logout-btn");

    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "/login.html";
      });
    });
  }
});
