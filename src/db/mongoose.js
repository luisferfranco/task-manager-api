const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,

    // Elimina los espacios al inicio y al final
    // para mandar datos más limpios a la base
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,

    // Envía en minúsculas a la base de datos
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Invalid age value: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error("El password debe ser de al menos 7 caracteres");
      }
      if (value.includes("password")) {
        throw new Error("El password no debe contener password");
      }
    },
  },
});

const me = new User({
  name: "Luis",
  email: "luis@example.com",
  age: 50,
  password: "szezaam",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log(err);
  });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: "Primera tarea",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((err) => {
    console.log(err);
  });
