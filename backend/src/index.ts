import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user/userRoutes';
import chuckRoutes from './routes/chucknorris/chuckNorrisRoutes';
import appRoutes from './routes/app/appRoutes';
import confirmationRoutes from './routes/mail/mailRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleWare';
import connectDb from './config/dbConfig';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDb();

const app = express();

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api/user', userRoutes);

app.use('/api/chucknorris', chuckRoutes);

app.use('/api/confirmation', confirmationRoutes);

app.use('/', appRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
