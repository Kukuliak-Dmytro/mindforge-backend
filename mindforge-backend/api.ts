import express from 'express';
import errorHandler from './src/middlewares/errorHandler';
import router from './src/routes/index';
import cors from 'cors';
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

// Error handling middleware must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 