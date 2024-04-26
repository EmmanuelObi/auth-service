import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScreenComponent } from './components/screen/screen.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'screen',
    component: ScreenComponent,
  },
  {
    path: '',
    redirectTo: 'screen',
    pathMatch: 'full',
  },
];
