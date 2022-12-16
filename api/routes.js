
import express from 'express';
import tasks from './src/controllers/task-controller.js';
import users from './src/controllers/user-controller.js';

const routes = express.Router();

//Tasks routes
routes.post('/tasks', tasks.addNewTask);
routes.get('/tasks/:user', tasks.findAllByUser);
routes.get('/tasks/:id', tasks.findById);
routes.delete('/tasks/:id', tasks.deleteTask);
routes.put('/tasks/:id', tasks.updateTask);

//Users routes
routes.post('/users', users.createUser);
routes.get('/users', users.getAllUsers);
routes.get('/users/:id', users.getUserById);
routes.delete('/users/:id', users.deleteUser);

//Login routes

export { routes as default };