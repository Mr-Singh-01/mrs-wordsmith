import express from 'express';
import accountRoutes from './routes/accounts';

const app = express();
app.use(express.json());

app.use('/accounts', accountRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
