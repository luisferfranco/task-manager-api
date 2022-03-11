const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = User;
