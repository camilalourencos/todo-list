import express from 'express';
import Task from '../model/task.js';
import * as TaskRepository from '../repository/task-repository.js';

export const router = express.Router();

async function addNewTask(req, res) {

  await Task.create({
    description: req.body.description,
    status: req.body.completed,
    userlogin: req.body.userlogin,
  }).then((result) => res.json(result));
}

async function findAllByUser(req, res) {
  const login = req.params.user;
  await Task.findAll({ where: { userlogin: login } }).then((result) => res.send(result));
  console.log(login)
}

async function findById(req, res) {
  await Task.findByPk(req.params.id).then((result) => res.json(result));
}

async function updateTask(req, res) {
  await Task.update(
    {
      description: req.body.description,
      status: req.body.completed
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  Task.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteTask(req, res) {
  await Task.destroy({
    where: {
      id: req.params.id
    }

  });
  Task.findAll().then((result) => res.json(result));
};

export default { addNewTask, findAllByUser, deleteTask, findById, updateTask };