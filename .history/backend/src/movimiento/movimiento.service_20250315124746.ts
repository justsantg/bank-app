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

  create(createMovimientoDto: CreateMovimientoDto) {
    const movimiento = this.movimientoRepository.create(createMovimientoDto);
    return this.movimientoRepository.save(movimiento);
  }

  findAll() {
    return this.movimientoRepository.find({
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Asegura que traemos la cuenta y su cliente
    });
  }
  
  findOne(id: number) {
    return this.movimientoRepository.findOne({
      where: { id },
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Incluye la relación al buscar un movimiento
    });
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    await this.movimientoRepository.update(id, updateMovimientoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.movimientoRepository.delete(id);
  }

  async findUltimoMovimiento(cuentaId: number): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { cuenta: { id: cuentaId } },
      order: { fecha: 'DESC' }, // Ordenar por fecha descendente (último movimiento primero)
      relations: ['cuenta', 'cuenta.cliente'], // Traer la cuenta y el cliente asociado
    });

    if (!movimiento) {
      throw new NotFoundException(`No se encontró ningún movimiento para la cuenta con ID ${cuentaId}`);
    }

    return movimiento;
  }
}
  

  async findWithFilters(
    cuentaId: number,
    tipo?: string,
    fechaInicio?: string,
    fechaFin?: string,
    orden: 'ASC' | 'DESC' = 'DESC',
  ) {
    console.log('Filtros recibidos:', { cuentaId, tipo, fechaInicio, fechaFin, orden });
  
    const query = this.movimientoRepository.createQueryBuilder('movimiento')
      .leftJoinAndSelect('movimiento.cuenta', 'cuenta')
      .where('movimiento.cuentaId = :cuentaId', { cuentaId });
  
    if (tipo) {
      console.log('Filtrando por tipo:', tipo);
      query.andWhere('UNACCENT(LOWER(movimiento.tipo)) = UNACCENT(LOWER(:tipo))', { tipo });
    }
  
    if (fechaInicio && fechaFin) {
      console.log('Filtrando por fecha:', { fechaInicio, fechaFin });
      query.andWhere('movimiento.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin });
    }
  
    query.orderBy('movimiento.fecha', orden);
  
    const result = await query.getMany();
    console.log('Resultado:', result);
  
    return result;
  }
}
