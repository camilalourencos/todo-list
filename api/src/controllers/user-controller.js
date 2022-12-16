import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';
//import * as UserRepository from '../repository/user-repository.js';

export const router = express.Router();

async function getAllUsers(req, res) {
  await User.findAll().then((result) => res.json(result));
}

async function getUserById(req, res) {
  await User.findByPk(req.params.id).then((result) => res.json(result));
}

function createUser(req, res) {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    login: req.body.login,
  })
    .then((result) => res.json(result))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

}

async function deleteUser(req, res) {
  await User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((result) => res.json(result))
  //User.findAll().then((result) => res.json(result));
};

export default { getAllUsers, getUserById, createUser, deleteUser }

