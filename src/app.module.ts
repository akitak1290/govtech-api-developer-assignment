import { Module } from '@nestjs/common';

import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    TeacherModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
