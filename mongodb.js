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

    db.collection("users")
      .updateOne(
        { _id: ObjectID("62282d83f5d12a605ccf99d3") },
        {
          $set: {
            name: "Luis Fer Franco",
            title: "Master of the Universe",
          },
          $inc: {
            nivel: 10,
          },
        }
      )
      .then((res) => {
        console.log("Updated ", res);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .updateMany(
        { completed: true },
        {
          $set: {
            completed: false,
          },
        }
      )
      .then((res) => {
        console.log("Updated " + res.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
