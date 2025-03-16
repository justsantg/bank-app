import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    console.log('Llamando a:', `${this.apiUrl}/cliente`); // Agregar un log para verificar la URL
    return this.http.get<any[]>(`${this.apiUrl}/cliente`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl, cliente}`);
}
