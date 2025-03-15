import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from 'src/entities/movimiento/movimiento.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
  ) {}

  async findAll(cuentaId: number, tipo?: string, fechaInicio?: string, fechaFin?: string, orden: 'ASC' | 'DESC' = 'DESC') {
    const query = this.movimientoRepository.createQueryBuilder('movimiento')
      .where('movimiento.cuentaId = :cuentaId', { cuentaId });

    if (tipo) {
      query.andWhere('movimiento.tipo = :tipo', { tipo });
    }

    if (fechaInicio && fechaFin) {
      query.andWhere('movimiento.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin });
    }

    query.orderBy('movimiento.fecha', orden);

    return query.getMany();
  }
}
