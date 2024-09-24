import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/Empleados'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getEmpleadoByIdAndCodigo(id: string, codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}&codigo=${codigo}`);
  }
}
