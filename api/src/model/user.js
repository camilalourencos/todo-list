import Sequelize from 'sequelize';
import db from '../persistence/db.js';

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

export default User;
