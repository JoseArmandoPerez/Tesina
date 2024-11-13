import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpsTrackingComponent } from './gps-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: GpsTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsTrackingRoutingModule {}
