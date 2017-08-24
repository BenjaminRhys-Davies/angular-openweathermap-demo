import { Routes } from '@angular/router';
import { CityListComponent } from './weather/components/city-list/city-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: CityListComponent,
  },
  {
    path: 'forecast/:id',
    component: CityListComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
