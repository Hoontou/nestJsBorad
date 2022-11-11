import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

//커스텀 파이프 만드는법. implemnts PipeTransform 에 상속받아서 만들고,
//그안에는 transform 메서드 필요.
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  //transform의 상세설명은 네스트에 내장된 파일에 들어가서 확인가능.
  transform(value: any) {
    //metadata: ArgumentMetadata) { 지금은 메타데이터는 사용할 필요없으니까 안쓴다.
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isnt tin the status options`);
    } // 네스트 내장된 err뱉는함수이다.

    return value; //이렇게하면 컨트롤러에는 Uppercase로 전환된 결과가 날라감.
  }

  //StatusOptions에 없는 인자가 indexOf에 담기면 -1을 뱉어낸다.
  //정상적인 status가 아니면 false를 뱉어냄.
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
