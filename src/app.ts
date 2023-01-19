import 'express-async-errors';
import express from 'express';

// ERROR
import handleError from './utils/libs/errors/handleError';
// ROUTER
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(handleError);

export default app;
