const prisma = require("../config/prisma");

class CardsController {
  async index(req, res) {
    const cards = await prisma.card.findMany();
    return res.status(200).send(cards);
  }

  async store(req, res) {
    try {
      const body = req.body;
      const card = await prisma.card.create({
        data: body,
      });
      return res.status(201).send(card);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const id_card = req.params.id;
      const result = await prisma.card.findUnique({
        where: {
          id: parseInt(id_card),
        },
      });

      if (id_card === undefined) {
        return res.status(404).send("Card not found !");
      }

      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id_card = req.params.id;
      const body = req.body;
      const card = await prisma.card.update({
        where: { id: parseInt(id_card) },
        data: body,
      });

      if (id_card === undefined) {
        return res.status(404).send("Card not found !");
      }

      card = body;
      return res.status(200).send(card);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id_card = req.params.id;
      const card = await prisma.card.delete({
        where: { id: parseInt(id_card) },
      });

      if (id_card === undefined) {
        return res.status(404).send("Card not found !");
      }

      return res.status(204);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async add_card(req, res) {
    try {
      const user_id = parseInt(req.params.user_id);
      const card_id = parseInt(req.params.card_id);

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      const card = await prisma.card.findUnique({
        where: { id: card_id },
      });

      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }

      if (!card) {
        return res.status(404).send("Carte non trouvée");
      }

      const updatedUser = await prisma.user.update({
        where: { id: user_id },
        data: { cards: { connect: { id: card_id } } },
      });

      return res.status(200).send(updatedUser);
    } catch (e) {
      return res.status(500).send("Erreur : ${e.message}");
    }
  }
}

module.exports = new CardsController();
