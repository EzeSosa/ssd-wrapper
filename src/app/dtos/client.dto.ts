import { DtoInterface } from './dto.interface';

export class Client implements DtoInterface {
  _id!: number;
  cuil!: string;

  buildPresentation(): string {
    return this.cuil;
  }

  getId(): number {
    return this._id;
  }
}
