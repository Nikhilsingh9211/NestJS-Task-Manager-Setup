/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register Task entity
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TypeOrmModule], // Export TypeOrmModule to use TaskRepository in other modules
})
export class TaskModule {}
