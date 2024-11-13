import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrarModule } from './registrar/registrar.module';
import { GpsTrackingComponent } from './gps-tracking/gps-tracking.component';
import { GpsTrackingRoutingModule } from './gps-tracking/gps-tracking-routing.module';
@NgModule({
  declarations: [AppComponent,GpsTrackingComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule, // Asegúrate de incluir este módulo
    HttpClientModule, 
    RegistrarModule,
    GpsTrackingRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
