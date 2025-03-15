import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column()
  tipo: string; // Débito o Crédito

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.movimientos, { onDelete: 'CASCADE' })
  cuenta: Cuenta;
}
