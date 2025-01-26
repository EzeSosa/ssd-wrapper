import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Dimension } from '../../interfaces/dimension.interface';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { QueryService } from '../../services/query.service';
import { MatToolbar } from '@angular/material/toolbar';
import { Query } from '../../interfaces/query.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'query',
  templateUrl: './query.component.html',
  styleUrl: './query.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbar,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class QueryComponent implements OnInit {
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #queryService: QueryService = inject(QueryService);
  #fb: FormBuilder = inject(FormBuilder);
  #location: Location = inject(Location);

  formGroup!: FormGroup;
  query!: Query;

  ngOnInit(): void {
    this.loadQuery();
  }

  private loadQuery(): void {
    this.#activatedRoute.params
      .pipe(
        switchMap((params) => this.#queryService.getQueryById(params['id']))
      )
      .subscribe({
        next: (query) => {
          if (!query) return;
          this.loadControlsFromQuery(query);
        },
        error: (error) => console.error(error),
      });
  }

  private loadControlsFromQuery(query: Query): void {
    this.query = query;

    const formControls = this.query.dimensions.reduce((controls, dimension) => {
      controls[dimension.bodyName] = [''];
      return controls;
    }, {} as { [key: string]: any });

    this.formGroup = this.#fb.group(formControls);
  }

  getOptions(dimension: Dimension): string[] {
    if (dimension.type === 'selector') {
      return ['Opción 1', 'Opción 2', 'Opción 3'];
    }
    return [];
  }

  onSubmit(): void {
    console.log('Formulario enviado:', this.formGroup.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
