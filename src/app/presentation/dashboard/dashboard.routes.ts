import { Routes } from '@angular/router';
const dashBoardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./home/home.component'),
        title: 'Atom - TaksList',
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];

export default dashBoardRoutes;
