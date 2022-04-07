import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const id = uuidv4();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: id,
    description: 'Passear com Zório',
    completed: true,
  },
  {
    id: id,
    description: 'Estudar',
    completed: false,
  },
];

app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

app.get('/tasks/:id?', (req, res) => {
  const taskId = tasks.filter((task) => task.id == req.params.id);
  res.send(taskId);
});

app.post('/tasks', (req, res) => {
  const newTask = { id, ...req.body };
  tasks.push(newTask);
  res.status(201).send(newTask);
});

export default app;
