const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please give the password name and number as arguments");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://fullstack:${password}@cluster0.tw3y9nr.mongodb.net/persons?retryWrites=true&w=majority&appName=Cluster0`;

// connect to database
mongoose.connect(url);
// mongoose schema

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// model
const Contact = mongoose.model("Persons", phoneBookSchema);

// display contacts
if (name === undefined) {
  console.log("Displaygin contacts");
  Contact.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  // create a new contact

  const person = new Contact({
    name,
    number,
  });

  // save in data base an close connection

  person.save().then((response) => {
    console.log("contact saved");
    mongoose.connection.close();
  });
}
