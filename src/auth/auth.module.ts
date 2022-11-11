import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './user.entitiy';
import { BoardsRepository } from '../board/board.repository';
import { BoardsModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BoardsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
