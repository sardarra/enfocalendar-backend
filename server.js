import express from 'express';
import { connectDB } from './config/db.js';
import Event from './models/Events.js';

import projectRoutes from './routes/project.routes.js';
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use('/calendar/data', projectRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});


// Mongodb password: T24i221N