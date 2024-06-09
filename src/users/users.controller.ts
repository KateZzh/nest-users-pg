import { Controller, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('problems-reset')
  async updateUsersProblems() {
    return await this.usersService.updateUsersProblemsService();
  }
}
