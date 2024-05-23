require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/contacts");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>hellow phoneBook</h1>");
});

/* create id */
const generateId = () => {
  const maxId =
    contacts.length > 0 ? Math.max(...contacts.map((n) => n.id)) : 0;
  return maxId + 1;
};

/* return all data */
app.get("/api/persons", (request, response) => {
  Person.find({}).then((contacts) => {
    response.json(contacts);
  });
});

/* info page */
app.get("/info", (request, response) => {
  const numPeople = Person.find({}).then((contacts) => contacts.length);
  const today = new Date();
  const template = `<p>Phonebook has info for ${numPeople} people<p><br/><p>${today}</p>`;
  response.send(template);
});

/* one persons data */
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = Person.findById(id).then((person) => person);
  if (person[0]) {
    return response.send(JSON.stringify(note));
  }
  response.sendStatus(404);
});

/* delete note */
/* 
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const persons = contacts.filter((item) => item.id !== Number(id));
  contacts = persons;
  response.sendStatus(200);
});
 */
/* add a contact */
app.post("/api/persons", (request, response) => {
  // get post data
  const newPerson = request.body;
  // check if person is on db
  if (newPerson === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  // create a new contact
  const contactToAdd = new Person({
    name: newPerson.name,
    number: newPerson.number,
  });
  contactToAdd.save().then((person) => {
    response.json(person);
  });
});
/* connection part */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
