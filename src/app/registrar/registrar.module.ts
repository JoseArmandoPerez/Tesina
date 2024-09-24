// registrar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Si necesitas formularios en RegistrarComponent
import { IonicModule } from '@ionic/angular';
import { RegistrarComponent } from './registrar.component';
import { RegistrarRoutingModule } from './registrar-routing.module';

@NgModule({
  declarations: [
    RegistrarComponent // Declara el componente aquí
  ],
  imports: [
    CommonModule, // Importa CommonModule para utilizar directivas comunes como ngIf, ngFor, etc.
    FormsModule, // Importa FormsModule si necesitas formularios en RegistrarComponent
    IonicModule, // Importa IonicModule para utilizar componentes de Ionic
    RegistrarRoutingModule
  ],
  exports: [
    RegistrarComponent // Exporta el componente si lo necesitas en otros módulos
  ]
})
export class RegistrarModule { }
