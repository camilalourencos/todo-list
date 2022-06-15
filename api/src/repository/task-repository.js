import { v4 as uuidv4 } from 'uuid';
import Task from '../model/task.js';

const tasks = [
  new Task(uuidv4(), 'Passear com Zório', true, 'zório2'),
  new Task(uuidv4(), 'Estudar', false, 'zório'),
];

export function taskList() {
  return tasks;
}

export function addTask(task) {
  taskList().push(task);
}

export function findByUser(userLogin) {
  return taskList().filter((task) => task.userLogin === userLogin);
}

export function findById(id) {
  return taskList().findIndex((task) => task.id == id);
}
