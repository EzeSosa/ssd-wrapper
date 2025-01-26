import { Query } from './query.interface';

export interface Cube {
  id: string;
  title: string;
  description: string;
  icon: string;
  queries: Query[];
}
