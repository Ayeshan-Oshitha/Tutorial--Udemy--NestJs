import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // Create the connection datasource
  const AppDataSource = await new DataSource({
    type: 'postgres',
    synchronize: config.get<boolean>('database.synchronize'),
    host: config.get<string>('DATABASE_HOST'),
    port: config.get<number>('DATABASE_PORT'),
    username: config.get<string>('DATABASE_USER'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_NAME'),
  });

  // Drop all tables
  await AppDataSource.dropDatabase();

  // close the connection
  await AppDataSource.destroy();
}
