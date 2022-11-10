import { Inject, Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: BoardRepository,
  ) {} //컨스트럭터에 프라이빗으로 값을 넣으면 선언한것과 같이 취급하기때문에 위에서 따로 선언안해도 됨.

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);

    return board;
  }
  //https://www.inflearn.com/questions/482960
  //https://www.inflearn.com/questions/566544
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    //const found = await this.boardRepository.findOne({ where: { id } });
    //뭔가 버전업되면서 그냥 id 써도 됐었는데 이제 where절 붙이게 바꼇나봄.

    if (!found) {
      throw new NotFoundException(`Cant find Board with id ${id}`);
    }

    return found;
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   //const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title: createBoardDto.title,
  //     description: createBoardDto.description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`); //네스트에 있는 예외처리 기능
  //     //문자열 인자로 안넘기면 그냥 not found 메세지 날라감. status는 404
  //   }
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id); //없는 게시물 지우려고할때 에러메세지 나감.
  //   //아이디가 같지 않은것만 남긴다 -> id같은건 삭제시킨다.
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
