/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { Task } from '../task/task.entity'; // Import Task
import { TaskModule } from '../task/task.module'; // Import TaskModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]), // Register Team entity
    TaskModule, // Import the TaskModule which includes the Task entity
  ],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {
  
}
