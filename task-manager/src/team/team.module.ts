/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
// import { Assignee } from 'src/assignee/assignee.entity';
import { AssigneeModule } from 'src/assignee/assignee.module'; // Import AssigneeModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]), // Register Team entity
    AssigneeModule, // Import the AssigneeModule
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

