const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
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

      // Indica que solo puede haber una cuenta de usuario
      unique: true,

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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Relación con tareas
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// Los estáticos se ejecutan en las clases, los métodos en las instancias
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "ThisIsMySecret");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Can't Login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Can't Login");
  }

  return user;
};

// .pre() indica lo que se hará antes de que ocurra el evento (save en este caso)
// .post() indica lo que se hará después de que ocurra el evento
// next es un parámetro que indica que se debe continuar con el evento original, si no se llama a next() se quedará ciclado
userSchema.pre("save", async function (next) {
  // this se refiere al documento que se está guardando, se asigna a una constante user para que sea más entendible lo que se hace, aunque no es necesario
  const user = this;

  // Se verifica si el password ha sido cambiado. Esto ocurre al momento de crear el usuario y al momento de actualizarlo. En ese caso, el password está en texto claro y necesita ser hasheado
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Borrar las tareas de usuario cuando se borra el ususario
userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
