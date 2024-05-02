document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./index.html";
  }

  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    window.location.href = "./index.html";
    localStorage.removeItem("token");
  }

  const data = await response.json();

  document.getElementById("name").innerHTML = `Nom : ${data.name}`;
  document.getElementById("pseudo").innerHTML = `Pseudo : ${data.pseudo}`;
  document.getElementById("age").innerHTML = `Age : ${data.age}`;
  document.getElementById("email").innerHTML = `Email : ${data.email}`;
});

function removeToken() {
  const button = document.getElementById("logout");
  button.addEventListener("click", () => {
    localStorage.removeItem("token");
  });
}

removeToken();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour récupérer les cartes possédées par un utilisateur
async function getCartesUtilisateur(userId) {
  try {
    // Utilise Prisma Client pour interroger la table intermédiaire
    const utilisateur = await prisma.user.findUnique({
      where: { id: userId },
      include: { cards: true }, // Récupère les cartes associées à l'utilisateur
    });

    return utilisateur.cards;
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes :", error);
    throw error;
  }
}

// Fonction pour afficher le nombre de cartes dans le HTML
async function afficherNombreCartes(userId) {
  try {
    // Récupère les cartes de l'utilisateur
    const cards = await getCartesUtilisateur(userId);

    // Affiche le nombre de cartes possédées
    const nombreCartes = cards.length;
    const nbCartesElement = document.getElementById("nb_cards");
    if (nbCartesElement) {
      nbCartesElement.textContent = nombreCartes.toString();
    } else {
      console.error(
        "L'élément avec l'ID 'nb_cards' n'a pas été trouvé dans le document HTML."
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'affichage du nombre de cartes :", error);
  }
}

// Appelle la fonction pour afficher le nombre de cartes lorsque la page est chargée
window.addEventListener("load", async () => {
  try {
    // Récupère les données de l'utilisateur
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await response.json();
    const userId = userData.userId;

    // Affiche le nombre de cartes possédées
    await afficherNombreCartes(userId);
  } catch (error) {
    console.error("Erreur lors du chargement de la page :", error);
  }
});
