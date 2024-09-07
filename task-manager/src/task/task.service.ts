/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

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

  // New method to assign a task to a team member
  async assignTaskToMember(taskId: string, memberId: string) {
    // Convert memberId to ObjectId if valid
    console.log(taskId)
    console.log(ObjectId.isValid(taskId));
    const objectIdTaskId = ObjectId.isValid(taskId)
      ? new ObjectId(taskId)
      : null;


    if (!objectIdTaskId) {
      throw new NotFoundException('Invalid Member (Task) ID format');
    }
    const task = await this.taskRepository.findOne({
      where: { _id: objectIdTaskId },
    });
    console.log(task)
    if (!task) {
      throw new Error('Task not found');
    }
    task.assignee = memberId;
    return this.taskRepository.save(task);
  }
}
