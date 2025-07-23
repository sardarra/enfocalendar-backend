import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import Event from './models/Events.js';
import projectRoutes from './routes/project.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for local frontend
app.use(cors({
  origin: 'http://localhost:3000', // or ['http://localhost:3000', 'https://yourfrontenddomain.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true // only if you're using cookies or auth tokens
}));

app.use(express.json());

// ✅ Routes
app.use('/calendar/data', projectRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// ✅ Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
