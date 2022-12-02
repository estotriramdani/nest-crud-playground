import { Cat } from '../entities/cat.entity';

export class CreateCatDto extends Cat {
  readonly name: string;
  readonly age: number;
}
