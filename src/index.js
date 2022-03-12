const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Configuración para que Express haga el parsing de
// los datos que le llegan como json
app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
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

app.patch("/users/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
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

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  // Verificar que solo podamos cambiar ciertos campos
  const updates = Object.keys(req.body);
  const allowedUpdate = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Bad Update");
  }

  // Buscar y actualizar
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    return res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server on port " + port);
});
