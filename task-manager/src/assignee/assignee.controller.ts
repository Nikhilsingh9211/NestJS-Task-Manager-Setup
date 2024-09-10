/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AssigneeService } from './assignee.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assignees')
@UseGuards(JwtAuthGuard)
export class AssigneeController {
  constructor(private readonly assigneeService: AssigneeService) {}

  @Post()
  async createAssignee(
    @Body() body: { name: string; email: string; role: string },
  ) {
    return this.assigneeService.createAssignee(
      body.name,
      body.email,
      body.role,
    );
  }

  @Get()
  async findAllAssignees() {
    return this.assigneeService.findAllAssignees();
  }

  @Get(':id')
  async findAssigneeById(@Param('id') id: string) {
    return this.assigneeService.findAssigneeById(id);
  }
}
