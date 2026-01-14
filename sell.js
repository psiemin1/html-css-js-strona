import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.querySelector(".sell__form");

// Tylko zalogowani mogą dodawać książki
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Musisz się zalogować, aby sprzedawać książki!");
    window.location.href = "/login.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form[0].value;
  const author = form[1].value;
  const description = form[2].value;
  const price = form[3].value;

  try {
    await addDoc(collection(db, "books"), {
      title,
      author,
      description,
      price,
      createdBy: auth.currentUser.uid,
      sellerName: auth.currentUser.displayName,
      sellerEmail: auth.currentUser.email,
      createdAt: new Date()
    });

    alert("Książka została dodana!");
    form.reset();
  } catch (error) {
    console.error("Błąd:", error);
    alert("Nie udało się dodać książki");
  }
});
