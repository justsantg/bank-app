import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Movimiento } from './movimiento.entity';
import { Cliente } from '../cliente/cliente.entity';

@Entity('cuentas')
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // Ahorro, Corriente, Crédito

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saldo: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.cuentas, { onDelete: 'CASCADE' })
  cliente: Cliente;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.cuenta)
  movimientos: Movimiento[];
}
