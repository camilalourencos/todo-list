import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import * as UserController from './controllers/user-controller.js';
import * as TaskController from './controllers/task-controller.js';
import * as LoginController from './controllers/login-controller.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyToken);

const SECRET = 'MySecret';

app.use('/', LoginController.router);
app.use('/', UserController.router);
app.use('/', TaskController.router);

//---------- Middleware -----------------

function verifyToken(req, res, next) {
  const token = req.header('authorization');
  if (!token) {
    res.status(401).send('No token provided');
  } else {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        res.status(500).send('Failed to authenticate token.');
      }
      req.body.userLogin = decoded.login;
      console.log(decoded);
      next();
    });
  }
}

export default app;
