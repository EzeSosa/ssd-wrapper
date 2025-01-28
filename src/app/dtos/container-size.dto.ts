import { DtoInterface } from './dto.interface';

export class ContainerSize implements DtoInterface {
  _id!: number;
  largo!: number;
  ancho!: number;
  alto!: number;

  buildPresentation(): string {
    return `${this.largo} x ${this.ancho} x ${this.alto}`;
  }

  getId(): number {
    return this._id;
  }
}
