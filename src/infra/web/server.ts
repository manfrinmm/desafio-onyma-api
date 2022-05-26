import 'reflect-metadata';
import '@infra/containers';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import connection from '@infra/typeorm';

import swaggerFile from '../../../swagger_output.json';
import { app } from './express';

dotenv.config();

connection();

const port: number = Number(process.env.PORT) || 3333;

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
