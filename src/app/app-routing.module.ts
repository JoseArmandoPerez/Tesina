import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistrarModule } from './registrar/registrar.module';
import { GpsTrackingComponent } from './gps-tracking/gps-tracking.component';
import { ChatComponent } from './chat/chat.component';

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
    path: 'gps-tracking/:id_usuario',
    component: GpsTrackingComponent
  },
  
  {
    path: 'chat',
    component: ChatComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
