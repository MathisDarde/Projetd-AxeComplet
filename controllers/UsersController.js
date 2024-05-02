const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  async store(req, res) {
    try {
      const body = req.body;
      console.log(body);
      const user = await prisma.user.create({
        data: {
          name: body.name,
          pseudo: body.pseudo,
          age: body.age,
          email: body.email,
          password: await hashPassword(body.password),
          confirmPassword: await hashPassword(body.confirmPassword),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const id_user = req.params.id;
      const result = await prisma.user.findUnique({
        where: {
          id: parseInt(id_user),
        },
      });

      if (id_user === undefined) {
        return res.status(404).send("User not found !");
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
      const id_user = req.params.id;
      const body = req.body;
      const user = await prisma.user.update({
        where: { id: parseInt(id_user) },
        data: body,
      });

      if (id_user === undefined) {
        return res.status(404).send("User not found !");
      }

      user = body;
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id_user = req.params.id;
      const user = await prisma.user.delete({
        where: { id: parseInt(id_user) },
      });

      if (id_user === undefined) {
        return res.status(404).send("User not found !");
      }

      return res.status(204);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new UsersController();
