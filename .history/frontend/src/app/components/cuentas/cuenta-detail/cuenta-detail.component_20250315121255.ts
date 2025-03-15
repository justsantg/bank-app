import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-detail',
  templateUrl: './cuenta-detail.component.html',
  styleUrls: ['./cuenta-detail.component.css']
})
export class CuentaDetailComponent implements OnInit {
  cuenta: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cuentaService: CuentaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cuentaService.getCuentaById(id).subscribe({
        next: (data) => {
          this.cuenta = data;
        },
        error: (err) => {
          console.error('Error al obtener la cuenta:', err);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/cuentas']);
  }
}
