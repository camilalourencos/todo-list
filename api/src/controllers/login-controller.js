import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as UserRepository from '../repository/user-repository.js';

export const router = express.Router();

const SECRET = 'MySecret';

router.post('/auth/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  const userExist = UserRepository.findByLogin(login);

  if (userExist) {
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (validPassword) {
      const payload = {
        id: userExist.id,
        userName: userExist.userName,
        login: userExist.login,
      };
      const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
      res.send(token);
    } else {
      res.status(401).send('Invalid password'); //por segurança, em uma aplicação real, não é descrito o que está de fato errado, usuário ou senha.
    }
  } else {
    res.status(401).send('Invalid user');
  }
});
