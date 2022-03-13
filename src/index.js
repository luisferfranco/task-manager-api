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

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("622d627fd3c77660244a7d32");
  // await task.populate("owner").execPopulate();
  // console.log(task);

  const user = await User.findById("622ccdbc00e875048401a4ab");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
