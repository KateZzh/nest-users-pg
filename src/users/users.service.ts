import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async updateUsersProblemsService(): Promise<number> {
    const numberUpdatedUsersProblems = await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set({ isproblems: false })
      .where('isproblems = :flag', { flag: true })
      .execute();

    return numberUpdatedUsersProblems.affected || 0;
  }
}
