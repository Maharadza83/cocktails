import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/cocktails/cocktails.routes')
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes')
      },
    ]

  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
