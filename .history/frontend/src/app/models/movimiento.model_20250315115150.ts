export interface Movimiento {
    id: number;
    monto: number;
    tipo: 'Crédito' | 'Débito';
    fecha: string;
    cuentaId?: number; // Opcional, en caso de necesitar la referencia
  }
  