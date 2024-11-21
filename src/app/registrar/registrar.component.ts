import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  user = {
    id_estudiante: null,
    nombre: '',
    apellido: '',
    carrera: '',
    direccion: '',
    semestre: '',
    password: '',
    foto_perfil_url: '',
    datos_biometricos: '',
  };

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async registerUser() {
    try {
      const response = await this.http.post('http://localhost:3000/api/usuarios', this.user).toPromise();
      console.log('Usuario registrado:', response);
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.navCtrl.navigateRoot('/home'); // Redirige a la página de inicio u otra página deseada
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      const toast = await this.toastController.create({
        message: 'Error al registrar usuario',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}