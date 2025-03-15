import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  // 🔥 Obtener el último movimiento de un cliente
  getUltimoMovimiento(clienteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movimiento/ultimo/${clienteId}`);
  }
}
