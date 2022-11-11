//import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

//@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(Board)
    public db: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.db.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.db.save(board);

    return board;
  }
}
