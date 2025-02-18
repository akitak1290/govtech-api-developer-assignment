import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

import * as dotenv from 'dotenv';
import { TypeOrmCustomLogger } from './typeorm.config';

dotenv.config();

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_HOST_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Teacher, Student],
  logging: true,
  logger: new TypeOrmCustomLogger(),
};
