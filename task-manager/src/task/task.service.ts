/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { AssigneeService } from 'src/assignee/assignee.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private assigneeService: AssigneeService, // Inject the AssigneeService
  ) {}

  async createTask(
    description: string,
    dueDate: Date,
    assigneeId: string,
    status: string,
  ) {
    const assignee = await this.assigneeService.findAssigneeById(assigneeId);

    // Get current date in UTC
    const currentDate = new Date().toISOString();

    // Convert both dates to UTC and compare
    if (new Date(dueDate).toISOString() <= currentDate) {
      throw new Error('The due date must be a future date.');
    }

    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    const task = this.taskRepository.create({
      description,
      dueDate,
      assignee: assignee._id, // Assign by ObjectId
      status,
    });

    return this.taskRepository.save(task);
  }

  async getAllTasks() {
    return this.taskRepository.find();
  }
  async updateTaskStatus(id: string, status?: string, description?: string) {
    // Check if the task exists
    const objectIdTaskId = ObjectId.isValid(id) ? new ObjectId(id) : null;
    if (!objectIdTaskId) {
      throw new NotFoundException('Invalid Team ID format');
    }

    const task = await this.taskRepository.findOne({
      where: { _id: objectIdTaskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Update only the provided fields
    if (status) {
      task.status = status;
    }
    if (description) {
      task.description = description;
    }

    return this.taskRepository.save(task); // Save the updated task
  }

  // New method to assign a task to a team member
  async assignTaskToMember(taskId: string, memberId: string) {
    // Convert taskId to ObjectId if valid
    const objectIdTaskId = ObjectId.isValid(taskId)
      ? new ObjectId(taskId)
      : null;

    if (!objectIdTaskId) {
      throw new NotFoundException('Invalid Task ID format');
    }

    // Find the task by ObjectId
    const task = await this.taskRepository.findOne({
      where: { _id: objectIdTaskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Convert memberId to ObjectId before assigning
    const objectIdMemberId = ObjectId.isValid(memberId)
      ? new ObjectId(memberId)
      : null;

    if (!objectIdMemberId) {
      throw new NotFoundException('Invalid Member ID format');
    }

    // Assign the member (assignee) to the task
    task.assignee = objectIdMemberId; // Correctly assign ObjectId

    // Save the updated task
    return this.taskRepository.save(task);
  }

  // New Method to Get Tasks by Assignee
  async getTasksByAssignee(assigneeId: string) {
    const objectIdAssigneeId = ObjectId.isValid(assigneeId)
      ? new ObjectId(assigneeId)
      : null;

    if (!objectIdAssigneeId) {
      throw new NotFoundException('Invalid Assignee ID format');
    }

    const tasks = await this.taskRepository.find({
      where: { assignee: objectIdAssigneeId },
    });

    return tasks;
  }
}
