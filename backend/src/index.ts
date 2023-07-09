import express, { urlencoded, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user/userRoutes';
import chuckRoutes from './routes/chucknorris/chuckNorrisRoutes';
import mailRoutes from './routes/mail/mailRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleWare';
import connectDb from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDb();

const app = express();

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/user', userRoutes);

app.use('/api/chucknorris', chuckRoutes);

app.use('/api/mail', mailRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
