// server/src/server.js
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(process.cwd(), './')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), './', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server Express berjalan di port ${port}`);
});
