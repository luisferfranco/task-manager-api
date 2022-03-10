// CRUD
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const database = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to MongoDB");
    }

    const db = client.db(database);

    // Regresa un cursor
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tareas) => {
        if (error) {
          return log.error("Ocurrió un error al traer las tareas");
        }
        console.log(tareas);
      });

    db.collection("tasks").findOne(
      { _id: new ObjectID("62282e115d0d3b50e87dc8a4") },
      (error, task) => {
        if (error) {
          return log.error("Ocurrió un error al traer la tarea");
        }
        console.log(task);
      }
    );
  }
);
