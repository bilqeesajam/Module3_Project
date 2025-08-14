import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import coursesRoutes from './routes/coursesRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to WebLaunch Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});