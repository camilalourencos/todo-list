import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';
import * as UserRepository from '../repository/user-repository.js';

export const router = express.Router();

router.get('/users', (req, res) => {
  res.status(200).send(UserRepository.userList());
});

router.get('/users/:id?', (req, res) => {
  const id = req.params.id;
  const userId = UserRepository.findById(id);

  if (userId) {
    res.send(userId);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/users', (req, res) => {
  const newUser = new User();
  //const newUser = req.body;
  newUser.login = req.body.login;
  newUser.userName = req.body.userName;
  newUser.id = uuidv4();
  newUser.password = bcrypt.hashSync(req.body.password, 10);

  UserRepository.addUser(newUser);
  res.status(201).send(newUser);
});
