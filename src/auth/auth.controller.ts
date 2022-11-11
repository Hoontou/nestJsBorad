import { Controller, Body, Post } from '@nestjs/common';
import { Board } from 'src/board/board.entity';
import { UsePipes } from '@nestjs/common/decorators';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { BoardsRepository } from '../board/board.repository';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private boardRepository: BoardsRepository,
  ) {}

  @Post()
  createBoard() {
    return this.boardRepository.db.delete(8);
  }
}
