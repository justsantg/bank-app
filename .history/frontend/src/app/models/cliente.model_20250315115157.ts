import { Movimiento } from "./movimiento.model";


export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  cuentas: {
    id: number;
    tipo: string;
    saldo: number;
    movimientos?: Movimiento[]; // Incluye los movimientos dentro de la cuenta
  }[];
}
