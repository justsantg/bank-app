import { CreateMovimientoDto } from './../../../../backend/src/movimiento/dto/create-movimiento.dto';
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
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUltimoMovimiento(clienteId: number): Observable<any> {
    const url = `${this.apiUrl}/ultimo/${clienteId}`;
    console.log('📢 Enviando solicitud a:', url);
    return this.http.get<any>(url);
  }  

  CreateMovimiento(movimiento:)
}
