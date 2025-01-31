import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { CubeCardComponent } from '../cube-card/cube-card.component';
import { Cube } from '../../interfaces/cube.interface';
import { CubesService } from '../../services/cubes.service';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    CubeCardComponent,
  ],
  templateUrl: './cube-list.component.html',
  styleUrl: './cube-list.component.css',
})
export class CubeLayoutComponent implements OnInit {
  #cubesService: CubesService = inject(CubesService);
  cubes: WritableSignal<Cube[]> = signal([]);

  ngOnInit() {
    this.#cubesService.getCubes().subscribe({
      next: (cubes) => this.cubes.set(cubes),
      error: (error) => console.log(error),
    });
  }
}
