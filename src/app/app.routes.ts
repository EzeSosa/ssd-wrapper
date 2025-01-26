import { Routes } from '@angular/router';
import { CubeLayoutComponent } from './components/cube-list/cube-list.component';
import { CubeComponent } from './components/cube/cube.component';
import { QueryComponent } from './components/query/query.component';

export const routes: Routes = [
  {
    path: 'cubes',
    component: CubeLayoutComponent,
  },
  {
    path: 'cubes/:id',
    component: CubeComponent,
  },
  {
    path: 'queries/:id',
    component: QueryComponent,
  },
  {
    path: '**',
    redirectTo: 'cubes',
  },
];
