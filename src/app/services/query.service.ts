import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Query } from '../interfaces/query.interface';
import { Cube } from '../interfaces/cube.interface';
import { CUBES_DATA } from '../data/cubes-data';

@Injectable({ providedIn: 'root' })
export class QueryService {
  cubes: Cube[] = CUBES_DATA;

  getQueryById(id: string): Observable<Query | undefined> {
    return of(this.getAllQueriesFromCubes().find((query) => query.id === id));
  }

  private getAllQueriesFromCubes(): Query[] {
    return this.cubes.reduce((queries: Query[], cube: Cube) => {
      return queries.concat(cube.queries);
    }, []);
  }
}
