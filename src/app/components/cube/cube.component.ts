import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CubesService } from '../../services/cubes.service';
import { Query } from '../../interfaces/query.interface';
import { Cube } from '../../interfaces/cube.interface';
import { QueryCardComponent } from '../query-card/query-card.component';

@Component({
  standalone: true,
  selector: 'cube',
  templateUrl: 'cube.component.html',
  styleUrl: 'cube.component.css',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    QueryCardComponent,
  ],
})
export class CubeComponent implements OnInit {
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #cubesService: CubesService = inject(CubesService);
  #router: Router = inject(Router);

  title: WritableSignal<string> = signal('');
  queries: WritableSignal<Query[]> = signal([]);

  ngOnInit(): void {
    this.#activatedRoute.params
      .pipe(switchMap((params) => this.#cubesService.getCubeById(params['id'])))
      .subscribe({
        next: (cube) => {
          if (cube) this.saveCubeInfo(cube);
        },
        error: (error) => console.error(error),
      });
  }

  private saveCubeInfo(cube: Cube) {
    this.title.set(`Consultas disponibles sobre ${cube.title}`);
    this.queries.set(cube.queries);
  }

  onGoBack() {
    this.#router.navigate(['/cubes']);
  }
}
