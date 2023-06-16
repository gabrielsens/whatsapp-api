import express from 'express';
import { router } from './router';
import { Server } from 'socket.io';
import http from 'node:http';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json());

app.use(router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 🔥`);
});
