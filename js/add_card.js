const prisma = require("../config/prisma");

const fetchCarte = async () => {
  try {
    const url = "https://hp-api.lainocs.fr/characters";
    const response = await fetch(url);
    let data = await response.json();
    data = data;

    data.forEach((carte) => {
      ajouterCarte(carte.name, carte.actor, carte.house);
    });
  } catch (e) {
    alert(e);
  }
};

async function ajouterCarte(nom, actor, house) {
  try {
    const nouvelleCarte = await prisma.card.create({
      data: {
        name: nom,
        actor: actor,
        house: house,
      },
    });
    console.log("Nouvelle carte ajoutée:", nouvelleCarte);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la carte:", erreur);
  } finally {
    await prisma.$disconnect();
  }
}

fetchCarte();
