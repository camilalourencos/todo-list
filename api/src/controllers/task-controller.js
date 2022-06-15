import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as TaskRepository from '../repository/task-repository.js';

export const router = express.Router();

router.post('/tasks', (req, res) => {
  const newTask = { id: uuidv4(), ...req.body };

  TaskRepository.addTask(newTask);
  res.status(201).send(newTask);
});

router.get('/tasks', (req, res) => {
  const userLogin = req.body.userLogin;
  const taskByUser = TaskRepository.findByUser(userLogin);

  if (taskByUser) {
    res.status(200).send(taskByUser);
    //console.log(tasks);
  } else {
    res.status(404).send('There is no task for this user');
  }
});

router.get('/tasks/:id?', (req, res) => {
  const item = TaskRepository.findById(req.params.id);

  if (item) {
    res.send(TaskRepository.taskList()[item]);
  } else {
    res.status(404).send('Note not found');
  }
});

router.put('/tasks/:id?', (req, res) => {
  const item = TaskRepository.findById(req.params.id);
  const tasks = TaskRepository.taskList();

  tasks[item].description = req.body.description;
  tasks[item].completed = req.body.completed;

  res.send(tasks[item]);
});

router.delete('/tasks/:id?', (req, res) => {
  const item = TaskRepository.findById(req.params.id);
  TaskRepository.taskList().splice(item, 1);

  res.send(taskList());
});
