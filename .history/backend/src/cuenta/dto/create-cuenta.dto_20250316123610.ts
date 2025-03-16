import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateCuentaDto {
  @IsString()
  @IsNotEmpty()
  tipo: string; // Ahorro, Corriente, Crédito

  @IsNumber()
  saldo: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number; // ID del cliente al que pertenece la cuenta
}
