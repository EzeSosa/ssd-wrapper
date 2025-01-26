import { Dimension } from './dimension.interface';

export interface Query {
  id: string;
  title: string;
  description: string;
  dimensions: Dimension[];
}
