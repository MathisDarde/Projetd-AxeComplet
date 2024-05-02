const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");
const CardsController = require("../controllers/CardsController");

const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

router.get("/cards", CardsController.index);
router.post("/cards", CardsController.store);
router.get("/cards/:id", CardsController.show);
router.put("/cards/:id", CardsController.update);
router.put("/cards/:id", CardsController.destroy);
router.put("/tirage_quo/:user_id/:id_card", CardsController.add_card);

module.exports = router;
