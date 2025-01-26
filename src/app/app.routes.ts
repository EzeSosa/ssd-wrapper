import { Routes } from '@angular/router';
import { QueryLayoutComponent } from './layouts/query-layout/query-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: QueryLayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
