import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { seedAdmin } from './seeders/adminSeeder';
import routes from './routes';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdmin(); // Seed admin user
  })
  .catch((err) => console.error('MongoDB connection failed:', err));

  // Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
