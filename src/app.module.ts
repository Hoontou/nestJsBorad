import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './board/board.module';
import { typeORMConfig } from './configs/typeorm.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BoardsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
