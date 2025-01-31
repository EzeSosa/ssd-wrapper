import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'cube-card',
  templateUrl: 'cube-card.component.html',
  styleUrl: 'cube-card.component.css',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
})
export class CubeCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() path!: string;

  #router: Router = inject(Router);

  hoverCard: WritableSignal<boolean> = signal(false);
  hoverButton: WritableSignal<boolean> = signal(false);

  onSeeMore(): void {
    this.#router.navigate(['/cubes', this.path]);
  }
}
