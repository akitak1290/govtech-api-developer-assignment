import {
  Controller,
  HttpCode,
  Post,
  Body,
  Get,
  Query,
  Logger,
  ParseArrayPipe,
} from '@nestjs/common';

import { RegisterStudentsDto } from './dto/register-students.dto';
import { TeacherService } from './teacher.service';
import { RetrieveForNotificationsDto } from './dto/retrieve-for-notifications.dto';
import { GetCommonStudentsDto } from './dto/get-common-students.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller()
export class TeacherController {
  private readonly logger: Logger;
  constructor(private teacherService: TeacherService) {
    this.logger = new Logger(TeacherController.name);
  }

  @HttpCode(204)
  @Post('/register')
  @ApiOperation({ summary: 'Register students for a teacher using email' })
  @ApiBody({ type: RegisterStudentsDto })
  @ApiResponse({
    status: 204,
    description: 'Students registered to teacher',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not Found Exception - Teacher or Students not found with provided email',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request Exception - Invalid Teacher or Students found with provided email',
  })
  registerStudents(
    @Body() registerStudentDto: RegisterStudentsDto,
  ): Promise<void> {
    this.logger.log(
      `Handling /register route with request body ${JSON.stringify(registerStudentDto)}`,
    );
    return this.teacherService.registerStudents(registerStudentDto);
  }

  @HttpCode(200)
  @Get('/commonstudents')
  @ApiOperation({ summary: 'Get common students registered to teachers' })
  @ApiQuery({
    name: 'teacher',
    type: String,
    required: true,
    isArray: true,
    description:
      'Email(s) of teacher(s) to find common students for. Pass multiple values as separate query parameters (e.g., ?teacher=a@b.com&teacher=c@d.com).',
    example: ['teacherken@gmail.com', 'teacherzoe@gmail.com'],
  })
  @ApiExtraModels(GetCommonStudentsDto)
  @ApiResponse({
    status: 200,
    description: 'Found students',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not Found Exception - One or more Teachers not found with provided emails',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request Exception - Invalid one or more Teachers found with provided email',
  })
  getCommonStudents(
    @Query() getCommonStudentsDto: GetCommonStudentsDto,
  ): Promise<string[]> {
    this.logger.log(
      `Handling /commonstudents route with query params ${JSON.stringify(getCommonStudentsDto)}`,
    );
    return this.teacherService.getCommonStudents(getCommonStudentsDto);
  }

  @HttpCode(200)
  @Post('/retrievefornotifications')
  @ApiOperation({ summary: 'Get students for notification' })
  @ApiBody({ type: RetrieveForNotificationsDto })
  @ApiResponse({
    status: 200,
    description: 'Found students',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found Exception - Teacher not found with provided email',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request Exception - Invalid Teacher or Notification found with provided body',
  })
  retrieveForNotification(
    @Body() retrieveForNotificationsDto: RetrieveForNotificationsDto,
  ): Promise<{ recipients: string[] }> {
    this.logger.log(
      `Handling /retrievefornotifications route with request body ${JSON.stringify(retrieveForNotificationsDto)}`,
    );
    return this.teacherService.retrieveForNotifications(
      retrieveForNotificationsDto,
    );
  }
}
