import Sequelize, { DOUBLE } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  // ssl: true,
  // dialectOptions: {
  //   ssl: { require: true },
  // },
});


export default db;
