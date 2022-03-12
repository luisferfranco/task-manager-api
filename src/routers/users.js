const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid Updates");
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      // El método nos regresará el nuevo usuario, y no por
      // el que buscamos
      new: true,

      // Se corren los validadores para tener datos correctos
      // y limpios
      runValidators: true,
    });

    // Si no se encontró el usuario, se manda un 404 (not found)
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    // Los errores pueden deberse a un problema en el server (500)
    // o a que se envió mal el id (400)
    res.status(400).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (error) {
    return res.status(500).send();
  }
});

module.exports = router;
