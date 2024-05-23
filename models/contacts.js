const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connectin to database
const url = process.env.MONGODB_URI;
console.log("connection to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb: ", error.msg);
  });

// database schema
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// transform model to hide _id and __v
phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", phoneBookSchema);
