import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadChildren: () => import('./shared/shared-managment.module').then(m => m.sharedManagmentModule),
    data: { layout: 'none' } // login/forgot etc usually here
  },

   { 
     path: 'hr', 
     canActivate: [authGuard],
     loadChildren: () => import('./hr-management/hr-managment.module').then(m => m.HrManagmentModule) 
   },

   { 
     path: 'dashboard', 
     canActivate: [authGuard],
     loadChildren: () => import('./layout/dashboard-managment.module').then(m => m.DashboardManagmentModule) 
   },

   { 
     path: 'setting', 
     canActivate: [authGuard],
     loadChildren: () => import('./settings-management/setting-managment.module').then(m => m.SettingManagmentModule) 
   },

   { path: '**', redirectTo: '' }
];
