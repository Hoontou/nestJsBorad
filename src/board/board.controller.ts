import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Patch, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBOardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBOardDto);
  }

  // @Post()
  // @UsePipes(ValidationPipe) //유효성체크 파이프 -> 모델의 @IsNotEmpty가 작동하게 만든다.
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   //param이 많을때? @Param() params: string[] 해서 꺼내쓸 수 있다.
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   //파라미터 단에서 작동하는 커스텀 파이프를 넣었으며, status가 들어와야하는 값이 아닐경우
  //   //에러 보내준다. 익스프레스의 미들웨어랑 비슷한 성격이네
  // ) {
  //   //여기까지 들어왔다는건 유효성체크하는 파이프를 통과했다는 뜻임.
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
