/* eslint-disable prettier/prettier */
// src/assignee/assignee.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignee } from './assignee.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AssigneeService {
  constructor(
    @InjectRepository(Assignee)
    private assigneeRepository: Repository<Assignee>,
  ) {}

  async createAssignee(name: string, email: string, role: string) {
    const assignee = this.assigneeRepository.create({ name, email, role });
    return this.assigneeRepository.save(assignee);
  }

  async findAssigneeById(id: string) {
    const objectId = new ObjectId(id);
    return this.assigneeRepository.findOne({ where: { _id: objectId } });
  }

  async findAllAssignees() {
    return this.assigneeRepository.find();
  }
}
