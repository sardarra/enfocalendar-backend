import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import Event from './models/Events.js';
import projectRoutes from './routes/project.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Enable CORS for local frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/test-direct', (req, res) => {
  res.json({ message: 'Direct route works!', timestamp: new Date() });
});

// ✅ Routes
app.use('/calendar/data', projectRoutes);

const allowedOrigins = ['http://localhost:3000', 'https://yourfrontenddomain.com'];

// ✅ Global error handler
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// ✅ Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
