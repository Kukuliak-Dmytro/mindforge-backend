import express from 'express';
import errorHandler from './src/middlewares/errorHandler.ts';
import router from './src/routes/index.ts';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

// Error handling middleware must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 