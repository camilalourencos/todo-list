import Sequelize from 'sequelize';
import db from '../persistence/db.js';
import User from './user.js';

const Task = db.define('task', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  userlogin: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'login',
    },
  },
});
export default Task;
