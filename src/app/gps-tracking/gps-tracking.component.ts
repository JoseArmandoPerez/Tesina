import { Component, OnInit } from '@angular/core';
import * as ol from 'ol';
import OSM from 'ol/source/OSM'; // Importación correcta de OSM
import TileLayer from 'ol/layer/Tile'; // Importación correcta de TileLayer
import View from 'ol/View'; // Importación correcta de la vista
import { fromLonLat } from 'ol/proj'; // Función de proyección de coordenadas
import { HttpClient } from '@angular/common/http'; // Importación de HttpClient

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.component.html',
  styleUrls: ['./gps-tracking.component.scss'],
})
export class GpsTrackingComponent implements OnInit {

  map: ol.Map | undefined; // Asegúrate de que el mapa sea de tipo ol.Map o undefined

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initMap();
    this.loadRoutes();
  }

  initMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(), // Usa OpenStreetMap como fuente
        }),
      ],
      view: new View({
        center: fromLonLat([-102.2916, 21.8853]), // Coordenadas de Aguascalientes
        zoom: 13,
      }),
    });
  }

  loadRoutes() {
    this.http.get<any[]>('http://localhost:3000/api/rutas').subscribe(rutas => {
      const conductores: { [id: number]: any[] } = {};

      // Agrupar las rutas por id_conductor
      rutas.forEach(ruta => {
        if (!conductores[ruta.id_conductor]) {
          conductores[ruta.id_conductor] = [];
        }
        conductores[ruta.id_conductor].push(ruta);
      });

      // Asignar un color para cada conductor
      const colores = ['red', 'blue', 'green', 'orange', 'purple'];

      Object.keys(conductores).forEach((idConductor, index) => {
        const color = colores[index % colores.length]; // Asignar colores cíclicamente

        // Agregar los marcadores y trazar la ruta para cada conductor
        const rutasConductor = conductores[+idConductor];
        const coordenadas = rutasConductor.map(ruta => fromLonLat([ruta.longitud, ruta.latitud]));
        console.log(coordenadas)
        // Crear los marcadores
        rutasConductor.forEach(ruta => {
          const marker = new ol.Overlay({
            position: fromLonLat([ruta.longitud, ruta.latitud]),
            element: this.createMarker(color),
          });
          this.map?.addOverlay(marker);
        });
      });
    });
  }

  // Método para crear el marcador con el color especificado
  private createMarker(color: string): HTMLElement {
    const marker = document.createElement('div');
    marker.style.backgroundColor = color; // Establecer el color
    marker.style.width = '20px'; // Establecer tamaño del marcador
    marker.style.height = '20px';
    marker.style.borderRadius = '50%'; // Hacerlo circular
    marker.style.position = 'absolute';
    marker.style.transform = 'translate(-50%, -50%)'; // Asegura que el marcador esté centrado
    marker.style.border = '2px solid white'; // Agregar borde blanco para destacar
    return marker;
  }
}
