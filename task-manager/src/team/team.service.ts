/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb
import { Assignee } from 'src/assignee/assignee.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Assignee) // Inject the Assignee repository
    private assigneeRepository: Repository<Assignee>,
  ) {}

  async createTeam(name: string) {
    const team = this.teamRepository.create({ name, members: [] });
    return this.teamRepository.save(team);
  }

  async addTeamMember(teamId: string, memberId: string) {
    // Convert teamId to ObjectId
    const objectIdTeamId = ObjectId.isValid(teamId)
      ? new ObjectId(teamId)
      : null;
    if (!objectIdTeamId) {
      throw new NotFoundException('Invalid Team ID format');
    }

    // Fetch the team
    const team = await this.teamRepository.findOne({
      where: { _id: objectIdTeamId },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Convert memberId to ObjectId
    const objectIdMemberId = ObjectId.isValid(memberId)
      ? new ObjectId(memberId)
      : null;
    if (!objectIdMemberId) {
      throw new NotFoundException('Invalid Member (Assignee) ID format');
    }

    // Fetch the assignee (member)
    const member = await this.assigneeRepository.findOne({
      where: { _id: objectIdMemberId },
    });

    if (!member) {
      throw new NotFoundException('Assignee (Member) not found');
    }

    // Add the member (Assignee) to the team
    team.members.push(member);

    // Save the updated team
    return this.teamRepository.save(team);
  }

  getAllTeams() {
    return this.teamRepository.find({ relations: ['members'] });
  }
}
