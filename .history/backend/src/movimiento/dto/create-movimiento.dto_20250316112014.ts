import { IsString, IsNumber } from 'class-validator';

export class CreateMovimientoDto {
  @IsNumber()
  monto!: number;

  @IsString()
  tipo!: string; // Debito o Credito

  @IsNumber()
  cuentaId: number;
}
