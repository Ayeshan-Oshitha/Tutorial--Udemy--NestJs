import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();
    // Connect Query Runner to datasource
    await queryRunner.connect();

    // Start Transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // If Successful , commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // If Unsuccessful, rollback transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // Release Connection
      await queryRunner.release();
    }

    return newUsers;
  }
}
