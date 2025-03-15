import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cuenta } from '../cuenta/cuenta.entity';


@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number;

  @Column()
  tipo!: string; // Débito o Crédito

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.movimientos, { onDelete: 'CASCADE' })
  cuenta!: Cuenta;
}
