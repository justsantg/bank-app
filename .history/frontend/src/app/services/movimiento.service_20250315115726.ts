import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private movimientoUrl = 'http://localhost:3000/movimiento/ultimo';

  constructor(private http: HttpClient) {}

  getUltimoMovimiento(clienteId: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.movimientoUrl}/${clienteId}`);
  }
}
