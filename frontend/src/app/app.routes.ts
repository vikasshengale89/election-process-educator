import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'login/success',
    loadComponent: () => import('./login-success/login-success').then(m => m.LoginSuccess)
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
      { path: 'wizard', loadComponent: () => import('./features/wizard/wizard').then(m => m.Wizard) },
      { path: 'timeline', loadComponent: () => import('./features/timeline/timeline').then(m => m.Timeline) },
      { path: 'glossary', loadComponent: () => import('./features/glossary/glossary').then(m => m.Glossary) },
      { path: 'quiz', loadComponent: () => import('./features/quiz/quiz').then(m => m.Quiz) },
      { path: 'polling', loadComponent: () => import('./features/polling/polling').then(m => m.Polling) },
      { path: 'share', loadComponent: () => import('./features/share/share').then(m => m.Share) },
    ]
  },
  { path: '**', redirectTo: '' }
];
