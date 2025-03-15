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

  // ✅ Agregar este método para obtener el último movimiento de una cuenta
  getUltimoMovimiento(cuentaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ultimo/${cuentaId}`);
  }
}
