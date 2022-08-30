import dotenv from 'dotenv';
import app from './src/index.js';

dotenv.config();
const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running http://localhost:${port}`);
});
