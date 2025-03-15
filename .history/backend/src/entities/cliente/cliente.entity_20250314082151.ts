import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @OneToMany(() => Cuenta, (cuenta) => cuenta.cliente)
  cuentas: Cuenta[];
}
