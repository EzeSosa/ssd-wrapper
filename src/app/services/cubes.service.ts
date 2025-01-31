import { Injectable, WritableSignal } from '@angular/core';
import { Cube } from '../interfaces/cube.interface';
import { Observable, of } from 'rxjs';
import { CUBES_DATA } from '../data/cubes-data';

@Injectable({ providedIn: 'root' })
export class CubesService {
  cubes: Cube[] = CUBES_DATA();

  getCubes(): Observable<Cube[]> {
    return of(this.cubes);
  }

  getCubeById(id: string): Observable<Cube | undefined> {
    return of(this.cubes.find((cube) => cube.id === id));
  }
}
