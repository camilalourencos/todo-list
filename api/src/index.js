import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import * as UserController from './controllers/user-controller.js';
import * as TaskController from './controllers/task-controller.js';
import * as LoginController from './controllers/login-controller.js';
import db from './persistence/db.js';
import routes from '../routes.js'

const app = express();

app.use(cors());
app.use(express.json());
//app.use(verifyToken);

const SECRET = 'MySecret';

app.use('/', LoginController.router);
app.use('/', TaskController.router);
app.use(routes);

(async () => {
  const database = db;
  try {
    const result = await database.sync();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();

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
