/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(
    @Body()
    body: {
      description: string;
      dueDate: Date;
      assignee: string;
      status: string;
    },
  ) {
    return this.taskService.createTask(
      body.description,
      body.dueDate,
      body.assignee,
      body.status,
    );
  }

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Put(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.taskService.updateTaskStatus(id, body.status);
  }
}
