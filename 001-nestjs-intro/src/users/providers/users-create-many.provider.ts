import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { stringify } from 'querystring';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect Query Runner to datasource
      await queryRunner.connect();

      // Start Transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // If Successful , commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // If Unsuccessful, rollback transaction
      await queryRunner.rollbackTransaction();

      throw new ConflictException('Could not complete the transaction', {
        description: stringify(error),
      });
    } finally {
      // Extra - If need, We can just release QueryRunner inside finally without try catch nested in it
      try {
        // Release Connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release the database connection',
          {
            description: stringify(error),
          },
        );
      }
    }

    return newUsers;
  }
}
