import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`The URL that you have requested does not exist ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Not Found';
  }
  if (err.name === 'AxiosError') {
    statusCode = 404;
    message = 'Request failed with status code 404';
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.ENVIRONMENT === 'prod' ? {} : err.stack,
  });

  next();
};

export { notFound, errorHandler };
