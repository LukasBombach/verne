import inputMiddleware from './input';
import loggerMiddleware from './logger';

const middlewares: Function[] = [
  inputMiddleware,
  loggerMiddleware,
];

export default middlewares;
