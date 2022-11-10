import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'h991594',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
