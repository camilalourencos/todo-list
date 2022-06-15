import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { stringify, v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = 'MySecret';

/// ---- verificar:
// uso do método verifyToken

//---------- Users -----------------
const users = [
  {
    id: uuidv4(),
    name: 'Osório',
    login: 'zório',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    id: uuidv4(),
    name: 'Zorinho',
    login: 'zório2',
    password: bcrypt.hashSync('654321', 10),
  },
];

app.get('/users', (req, res) => {
  res.status(200).send(users);
});

app.get('/users/:id?', verifyToken, (req, res) => {
  const userId = users.find((user) => user.id == req.params.id);

  if (userId) {
    res.send(userId);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = uuidv4();
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  users.push(newUser);
  res.status(201).send(newUser);
});

//---------- Login -----------------
app.post('/auth/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  const userExist = users.find((user) => user.login === login);

  if (userExist) {
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (validPassword) {
      const payload = {
        id: userExist.id,
        name: userExist.name,
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

//---------- Tasks -----------------
const tasks = [
  {
    id: uuidv4(),
    description: 'Passear com Zório',
    completed: true,
    login: 'zório2',
  },
  {
    id: uuidv4(),
    description: 'Estudar',
    completed: false,
    login: 'zório',
  },
];

app.post('/tasks', verifyToken, (req, res) => {
  const newTask = { id: uuidv4(), ...req.body };

  tasks.push(newTask);
  res.status(201).send(newTask);
});

app.get('/tasks', verifyToken, (req, res) => {
  const userLogin = req.body.login;
  const taskByUser = tasks.filter((task) => task.login === userLogin);

  if (taskByUser) {
    res.status(200).send(taskByUser);
    console.log(tasks);
  } else {
    res.status(404).send('There is no task for this user');
  }
});

app.get('/tasks/:id?', verifyToken, (req, res) => {
  const item = findItem(req.params.id);

  if (item) {
    res.send(tasks[item]);
  } else {
    res.status(404).send('Note not found');
  }
});

app.put('/tasks/:id?', verifyToken, (req, res) => {
  let item = findItem(req.params.id);

  tasks[item].description = req.body.description;
  tasks[item].completed = req.body.completed;

  res.send(tasks);
});

app.delete('/tasks/:id?', verifyToken, (req, res) => {
  let item = findItem(req.params.id);
  tasks.splice(item, 1);

  res.send(tasks);
});

//---------- Methods -----------------

function verifyToken(req, res, next) {
  const token = req.header('authorization');
  if (!token) {
    res.status(401).send('No token provided');
  } else {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        res.status(500).send('Failed to authenticate token.');
      }
      req.body.login = decoded.login;
      //console.log(decoded);
      next();
    });
  }
}

function findItem(id) {
  return tasks.findIndex((task) => task.id == id);
}

export default app;
