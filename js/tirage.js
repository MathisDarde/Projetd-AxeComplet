"use strict";

function Getrandom() {
  return parseInt(Math.random() * (29 - 0) + 1);
}

// affiche les cartes
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./index.html";
  }

  const fetchCarte = async () => {
    try {
      const url = "https://hp-api.lainocs.fr/characters";
      const response = await fetch(url);
      let data = await response.json();
      data = data;
      displayCarte(data);
    } catch (e) {
      alert(e);
    }
  };

  const displayCarte = async (data) => {
    let content = document.getElementById("card-container");
    let info = document.getElementById("card-info");

    content.innerHTML = "";
    content.appendChild(info);

    let tab_random = [];

    for (let i = 0; i < 5; i++) {
      tab_random.push(Getrandom());
    }
    console.log(tab_random);

    tab_random.forEach(async (chiffre) => {
      ajouter_card(chiffre);
      const carte = data[chiffre];

      const carteCard = info.cloneNode(true);

      carteCard.style.display = "block";
      carteCard.querySelector("nom").textContent = `Nom : ${carte.name}`;

      carteCard.querySelector("house").textContent = `Maison : ${carte.house}`;

      if (carte.house) {
        carteCard.classList.add(carte.house);
      } else {
        carteCard.classList.add("no-house");
      }
      content.appendChild(carteCard);
    });
  };

  const ajouter_card = async (card_id) => {
    let user = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user = await user.json();
    const user_id = user.id;
    const url = `http://localhost:3000/tirage_quo/${user_id}/${card_id}`;
    const add = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  fetchCarte();
});
