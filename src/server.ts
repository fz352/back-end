import express from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(cors()); 
app.use(router);

app.listen(3333, () => 
  console.log('Server is running on port http://localhost:3333')
);