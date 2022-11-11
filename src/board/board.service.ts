import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Board } from './board.entity';
import { BoardsRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardsRepository) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.db.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.db.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Cant find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.db.delete(id);
    //consol.log result -> DeleteResult { raw: [], affected: 0 }
    if (result.affected === 0) {
      throw new NotFoundException(`Cant find Board id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.db.save(board);

    return board;
  }
}
