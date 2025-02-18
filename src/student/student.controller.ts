import { Controller, Body, HttpCode, Post, Logger } from '@nestjs/common';
import { SuspendStudentDto } from './dto/suspend-student.dto';
import { StudentService } from './student.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class StudentController {
  private readonly logger: Logger;
  constructor(private studentService: StudentService) {
    this.logger = new Logger(StudentController.name);
  }

  @HttpCode(204)
  @Post('/suspend')
  @ApiOperation({ summary: 'Suspend a student by email' })
  @ApiBody({ type: SuspendStudentDto })
  @ApiResponse({
    status: 204,
    description: 'Student suspended',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request Exception - Validation Error',
  })
  @ApiResponse({
    status: 404,
    description:
      'Student Not Found Exception - Student with provided email not found',
  })
  suspendStudent(@Body() suspendStudentDto: SuspendStudentDto): Promise<void> {
    this.logger.log(
      `Handling /suspendStudent with request body ${JSON.stringify(suspendStudentDto)}`,
    );
    return this.studentService.suspendStudent(suspendStudentDto);
  }
}
