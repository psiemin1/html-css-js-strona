import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const container = document.querySelector(".shop__container");

let currentUser = null;

// sprawdzamy logowanie
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

// pobieramy książki
const booksQuery = query(
  collection(db, "books"),
  orderBy("createdAt", "desc")
);

const snapshot = await getDocs(booksQuery);

container.innerHTML = "";

if (snapshot.empty) {
  container.innerHTML = "<p>Brak ofert książek.</p>";
}

// render kart
snapshot.forEach((docSnap) => {
  const book = docSnap.data();
  const bookId = docSnap.id;

  const card = document.createElement("div");
  card.className = "book__card";

  card.innerHTML = `
    <h2>${book.title}</h2>
    <p class="book__author">${book.author}</p>

    <p class="book__desc">
      ${book.description ?? ""}
    </p>

    <p class="book__price">${book.price} zł</p>

    <p class="book__seller">
      Sprzedawca:
      <strong>${book.sellerName ?? "Nieznany"}</strong><br />
      Email:
      <a href="mailto:${book.sellerEmail}">
        ${book.sellerEmail ?? ""}
      </a>
    </p>

    <button class="book__btn">Kup teraz</button>
    <button class="fav__btn">Dodaj do ulubionych</button>
  `;

  const favBtn = card.querySelector(".fav__btn");

  favBtn.addEventListener("click", async () => {
    if (!currentUser) {
      alert("Musisz się zalogować, aby dodać do ulubionych");
      window.location.href = "/login.html";
      return;
    }

    try {
      //  SPRAWDZENIE CZY JUŻ JEST W ULUBIONYCH
      const favQuery = query(
        collection(db, "favorites"),
        where("userId", "==", currentUser.uid),
        where("bookId", "==", bookId)
      );

      const existing = await getDocs(favQuery);

      if (!existing.empty) {
        alert("Ta książka jest już w ulubionych");
        return;
      }

      //  DODANIE DO ULUBIONYCH
      await addDoc(collection(db, "favorites"), {
        userId: currentUser.uid,
        bookId,
        title: book.title,
        author: book.author,
        description: book.description ?? "",
        price: book.price,
        sellerName: book.sellerName ?? "",
        sellerEmail: book.sellerEmail ?? "",
        createdAt: new Date()
      });

      alert("Dodano do ulubionych");
    } catch (err) {
      console.error("Błąd ulubionych:", err);
      alert("Błąd podczas dodawania do ulubionych");
    }
  });

  container.appendChild(card);
});
