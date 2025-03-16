import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/cliente'; // ✅ URL correcta del backend

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    console.log('Llamando a:', this.apiUrl); // 🔥 Log corregido
    return this.http.get<any[]>(this.apiUrl); // ✅ Eliminado el doble `/cliente`
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }
}
