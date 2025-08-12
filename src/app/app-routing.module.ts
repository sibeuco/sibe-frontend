import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './feature/home/home.module';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule) },
{ path: 'home', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
{ path: 'gestionar-direccion', loadChildren: () => import('./feature/manage-department/manage-department.module').then(m => m.ManageDepartmentModule) },
{ path: 'gestionar-usuarios', loadChildren: () => import('./feature/manage-users/manage-users.module').then(m => m.ManageUsersModule) },
{ path: 'gestionar-indicadores', loadChildren: () => import('./feature/manage-indicators/manage-indicators.module').then(m => m.ManageIndicatorsModule) },
{ path: 'area-bienestar', loadChildren: () => import('./feature/bienestar-area/bienestar-area.module').then(m => m.BienestarAreaModule) },
{ path: 'area-evangelizacion', loadChildren: () => import('./feature/evangelizacion-area/evangelizacion-area.module').then(m => m.EvangelizacionAreaModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
