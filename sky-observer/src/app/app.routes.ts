import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'moon-phases', loadComponent: () => import('./pages/moon-phases/moon-phases').then(m => m.MoonPhases) },
  { path: 'today', loadComponent: () => import('./pages/today/today').then(m => m.Today) },
  { path: 'seasons', loadComponent: () => import('./pages/seasons/seasons').then(m => m.Seasons) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) }
];