import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateCuentaDto {
  @IsEnum(['Ahorro', 'Corriente', 'Credito'])
  tipo: string;

  @IsNumber()
  saldo: number;

  @IsNumber()
  clienteId: number;
}
