import { Module } from '@nestjs/common';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { DatabaseModule } from '../database/database.module';
import { boardProviders } from './board.provider';
@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [...boardProviders, BoardsService],
})
export class BoardsModule {}
