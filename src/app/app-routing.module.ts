import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistrarModule } from './registrar/registrar.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarModule)
  },
  {
    path: 'gps-tracking', // Nueva ruta para el componente
    loadChildren: () => import('./gps-tracking/gps-tracking.module').then(m => m.GpsTrackingModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
