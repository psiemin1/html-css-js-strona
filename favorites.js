import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const container = document.querySelector(".shop__container");

// tylko zalogowany użytkownik
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Musisz się zalogować, aby zobaczyć ulubione");
    window.location.href = "/login.html";
    return;
  }

  const q = query(
    collection(db, "favorites"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>Nie masz jeszcze ulubionych książek.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const fav = docSnap.data();
    const favId = docSnap.id;

    const card = document.createElement("div");
    card.className = "book__card";

    card.innerHTML = `
      <h2>${fav.title}</h2>
      <p class="book__author">${fav.author}</p>

      <p class="book__desc">${fav.description ?? ""}</p>

      <p class="book__price">${fav.price} zł</p>

      <p class="book__seller">
        Email sprzedawcy:
        <a href="mailto:${fav.sellerEmail}">
          ${fav.sellerEmail}
        </a>
      </p>

      <button class="fav__btn remove">🗑 Usuń z ulubionych</button>
    `;

    // usuwanie z ulubionych
    const removeBtn = card.querySelector(".remove");
    removeBtn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "favorites", favId));
      card.remove();
    });

    container.appendChild(card);
  });
});
