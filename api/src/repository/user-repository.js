import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';

const users = [
  new User(uuidv4(), 'Osório', 'zório', bcrypt.hashSync('123456', 10)),
  new User(uuidv4(), 'Zorinho', 'zório2', bcrypt.hashSync('654321', 10)),
];

export function userList() {
  return users;
}

export function addUser(user) {
  userList().push(user);
}

export function findById(id) {
  return userList.find((user) => user.id == req.params.id);
}

export function findByLogin(login) {
  return userList.find((user) => user.login == req.params.login);
}
