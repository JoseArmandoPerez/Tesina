import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EmpleadosService } from '../empleados.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginData = { id: '', codigo: '' };  // Define correctamente la propiedad

  constructor(
    private browser: InAppBrowser,
    private router: Router,
    private alertController: AlertController,
    private empleadosService: EmpleadosService // Asegúrate de inyectar el servicio
  ) {}

  async onSubmit() {
    const { id, codigo } = this.loginData;
  
    this.empleadosService.getEmpleadoByIdAndCodigo(id, codigo).subscribe(
      (data) => {
        if (data) {
          this.showAlert('Éxito', 'Login correcto'); // Muestra alerta de éxito
          // Redirige al componente `gps-tracking` con el `id_usuario` en la URL
          this.router.navigate(['/gps-tracking', data.id_usuario]);
        } else {
          this.showAlert('Error', 'ID o contraseña incorrectos');
        }
      },
      (error) => {
        this.showAlert('Error', 'Error al intentar autenticar. Inténtalo de nuevo.');
      }
    );
  }
  

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  loginPage(){
    this.router.navigate(['registrar'])
  }
}
