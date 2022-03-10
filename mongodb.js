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
      .deleteMany({ age: { $lt: 51 } })
      .then((res) => {
        console.log("Borrados " + res.deletedCount);
      })
      .catch((err) => console.log(err));
  }
);
