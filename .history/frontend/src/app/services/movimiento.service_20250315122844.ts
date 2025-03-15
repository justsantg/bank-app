import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'http://localhost:3000/movimiento';

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMovimientosConFiltros(tipo?: string, fechaInicio?: string, fechaFin?: string): Observable<any[]> {
    let params: any = {};
    if (tipo) params.tipo = tipo;
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    return this.http.get<any[]>(`${this.apiUrl}/cuenta/1`, { params }); // Cambia el ID según corresponda
  }
}
