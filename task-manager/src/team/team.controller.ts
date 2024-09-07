/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  createTeam(@Body() body: { name: string }) {
    return this.teamService.createTeam(body.name);
  }

  @Post(':teamId/members')
  addTeamMember(
    @Param('teamId') teamId: string,
    @Body() body: { memberId: string },
  ) {
    return this.teamService.addTeamMember(teamId, body.memberId);
  }

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }
}
