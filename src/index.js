const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server on port " + port);
});

// const jwt = require("jsonwebtoken");

// const func = async () => {
//   const token = jwt.sign({ _id: "abc132" }, "ThisIsMySecret", {
//     expiresIn: "0 second",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "ThisIsMySecret");
//   console.log(data);
// };

// func();
