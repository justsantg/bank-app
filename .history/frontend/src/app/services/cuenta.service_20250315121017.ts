import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = 'http://localhost:3000/cuenta'; // URL del backend

  constructor(private http: HttpClient) {}

  getCuentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCuentaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
