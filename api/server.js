import app from './src/index.js';

const port = 8080;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running http://localhost:${port}`);
});
