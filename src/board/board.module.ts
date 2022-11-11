import { Module } from '@nestjs/common';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Board } from './board.entity';
import { BoardsRepository } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
  exports: [BoardsRepository],
})
export class BoardsModule {}
