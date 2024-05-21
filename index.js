const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
app.get("/persons", (request, response) => {
  response.json(contacts);
});

/* info page */
app.get("/info", (request, response) => {
  const numPeople = contacts.length;
  const today = new Date();
  const template = `<p>Phonebook has info for ${numPeople} people<p><br/><p>${today}</p>`;
  response.send(template);
});

/* one persons data */
app.get("/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = contacts.filter((item) => item.id === Number(id));
  if (person[0]) {
    return response.send(JSON.stringify(note));
  }
  response.sendStatus(404);
});

/* delete note */
app.delete("/persons/:id", (request, response) => {
  const id = request.params.id;
  const persons = contacts.filter((item) => item.id !== Number(id));
  contacts = persons;
  response.sendStatus(200);
});

/* add a contact */
app.post("/persons", (request, response) => {
  // get post data
  const newPerson = request.body;
  // check if person is on db
  const personExist = contacts.filter(
    (person) => person.name === newPerson.name
  );
  // generate a new id
  const id = generateId();
  // check if no data or if person already exist
  if (Object.values(newPerson)[0] === undefined) {
    return response.sendStatus(404);
  } else if (newPerson.name === "" || newPerson.number === "") {
    return response
      .status(404)
      .json({ error: "person name or number are empty" });
  } else if (personExist[0] !== undefined) {
    return response.status(404).json({ error: "person name already exist" });
  }
  // create a new contact
  const contactToAdd = {
    id: id,
    name: newPerson.name,
    number: newPerson.number,
  };
  contacts.push(contactToAdd);
  response.json(contactToAdd);
});
/* connection part */

const PORT = process.env.PORT || 3001;
app.listen(PORT);
