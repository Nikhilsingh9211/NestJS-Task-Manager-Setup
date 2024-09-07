/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { Task } from '../task/task.entity'; // Make sure to import Task
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Task) // Inject the Task repository to manage tasks (members)
    private taskRepository: Repository<Task>,
  ) {}

  async createTeam(name: string) {
    const team = this.teamRepository.create({ name, members: [] });
    return this.teamRepository.save(team);
  }

  async addTeamMember(teamId: string, memberId: string) {
    console.log(`Team ID: ${teamId}`);

    // Convert teamId to ObjectId if valid
    const objectIdTeamId = ObjectId.isValid(teamId)
      ? new ObjectId(teamId)
      : null;
    if (!objectIdTeamId) {
      throw new NotFoundException('Invalid Team ID format');
    }

    // Fetch the team by ID, ensuring members is initialized
    const team = await this.teamRepository.findOne({
      where: { _id: objectIdTeamId },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Initialize members array if it's undefined
    if (!team.members) {
      team.members = [];
    }

    // Convert memberId to ObjectId if valid
    const objectIdMemberId = ObjectId.isValid(memberId)
      ? new ObjectId(memberId)
      : null;
    if (!objectIdMemberId) {
      throw new NotFoundException('Invalid Member (Task) ID format');
    }

    // Fetch the task (member) by its ID
    const member = await this.taskRepository.findOne({
      where: { _id: objectIdMemberId },
    });

    if (!member) {
      throw new NotFoundException('Member (Task) not found');
    }

    console.log(`Member found: ${member}`);

    // Add the member to the team
    team.members.push(member);

    // Save the updated team
    return this.teamRepository.save(team);
  }
  
  getAllTeams() {
    return this.teamRepository.find({ relations: ['members'] });
  }
}
