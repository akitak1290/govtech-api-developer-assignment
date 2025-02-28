import { DataSource } from 'typeorm';

import 'dotenv/config';
import { Teacher } from 'src/teacher/teacher.entity';
import { Student } from 'src/student/student.entity';
import { TypeOrmCustomLogger } from './typeormlogger.config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_HOST_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Teacher, Student],
  migrations: ['dist/migrations/*.js'],
  logging: true,
  logger: new TypeOrmCustomLogger(),
});
