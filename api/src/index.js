import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());

//---------- Tasks -----------------
const tasks = [
  {
    id: uuidv4(),
    description: 'Passear com Zório',
    completed: true,
  },
  {
    id: uuidv4(),
    description: 'Estudar',
    completed: false,
  },
];

function findItem(id) {
  return tasks.findIndex((task) => task.id == id);
}

app.post('/tasks', (req, res) => {
  const newTask = { id: uuidv4(), ...req.body };

  tasks.push(newTask);
  res.status(201).send(newTask);
});

app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

app.get('/tasks/:id?', (req, res) => {
  const item = findItem(req.params.id);

  if (item) {
    res.send(tasks[item]);
  } else {
    res.status(404).send('Note not found');
  }
});

app.put('/tasks/:id?', (req, res) => {
  let item = findItem(req.params.id);

  tasks[item].description = req.body.description;
  tasks[item].completed = req.body.completed;

  res.send(tasks);
});

app.delete('/tasks/:id?', (req, res) => {
  let item = findItem(req.params.id);
  tasks.splice(item, 1);

  res.send(tasks);
});

//
//
//
//
//
//
//---------- Users -----------------
const users = [
  {
    id: uuidv4(),
    description: 'Passear com Zório',
    completed: true,
  },
  {
    id: uuidv4(),
    description: 'Estudar',
    completed: false,
  },
];

app.get('/users', (req, res) => {
  res.status(200).send(tasks);
});

app.get('/users/:id?', (req, res) => {
  const userId = users.find((user) => user.id == req.params.id);

  if (userId) {
    res.send(userId);
  } else {
    res.status(404).send('Note not found');
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = uuidv4();

  tasks.push(newUser);
  res.status(201).send(newUser);
});

export default app;
