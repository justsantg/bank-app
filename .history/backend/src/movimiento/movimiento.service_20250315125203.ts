import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Incluye cuenta y cliente
    });
  }

  findOne(id: number) {
    return this.movimientoRepository.findOne({
      where: { id },
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Incluye relaciones
    });
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    await this.movimientoRepository.update(id, updateMovimientoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.movimientoRepository.delete(id);
  }

  // ✅ Método para obtener el último movimiento de un cliente
  async findUltimoMovimientoclienteId(: number) {
    return this.movimientoRepository.findOne({
      where: { cuenta: { cliente: { id: clienteId } } },
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Asegurar que se traen las relaciones
      order: { fecha: 'DESC' },
    });
  }der: { fecha: 'DESC' }, // 🔥 Ordenado por fecha descendente
    });

    if (!movimiento) {
      throw new NotFoundException(`No se encontró movimiento para el cliente con ID ${clienteId}`);
    }

    return movimiento;
  }

  // ✅ Método para buscar con filtros
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
      .leftJoinAndSelect('cuenta.cliente', 'cliente') // 🔥 Incluye cliente
      .where('movimiento.cuentaId = :cuentaId', { cuentaId });

    if (tipo) {
      console.log('Filtrando por tipo:', tipo);
      query.andWhere('LOWER(movimiento.tipo) = LOWER(:tipo)', { tipo }); // 🔥 Eliminamos UNACCENT si no es necesario
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
