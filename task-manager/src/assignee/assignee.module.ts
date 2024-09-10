/* eslint-disable prettier/prettier */
// src/assignee/assignee.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignee } from './assignee.entity';
import { AssigneeService } from './assignee.service';
import { AssigneeController } from './assignee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assignee])],
  controllers: [AssigneeController],
  providers: [AssigneeService],
  exports: [AssigneeService, TypeOrmModule], // Export the service and TypeOrmModule
})
export class AssigneeModule {}
