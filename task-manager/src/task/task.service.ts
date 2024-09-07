/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(
    description: string,
    dueDate: Date,
    assignee: string,
    status: string,
  ) {
    const task = this.taskRepository.create({
      description,
      dueDate,
      assignee,
      status,
    });
    return this.taskRepository.save(task);
  }

  async getAllTasks() {
    return this.taskRepository.find();
  }

  async updateTaskStatus(id: string, status: string) {
    return this.taskRepository.update(id, { status });
  }
}
