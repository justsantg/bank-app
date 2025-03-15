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

  async create(createMovimientoDto: CreateMovimientoDto) {
    const movimiento = this.movimientoRepository.create(createMovimientoDto);
    return await this.movimientoRepository.save(movimiento);
  }

  async findAll() {
    return await this.movimientoRepository.find({
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Asegura que se traigan cuenta y cliente
    });
  }

  async findOne(id: number) {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id },
      relations: ['cuenta', 'cuenta.cliente'],
    });

    if (!movimiento) {
      throw new NotFoundException(`No se encontró el movimiento con ID ${id}`);
    }

    return movimiento;
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    await this.movimientoRepository.update(id, updateMovimientoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const movimiento = await this.findOne(id);
    await this.movimientoRepository.delete(id);
    return { message: `Movimiento con ID ${id} eliminado correctamente` };
  }

  // ✅ Método corregido para obtener el último movimiento de un cliente
  async findUltimoMovimiento(clienteId: number) {
    const movimiento = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoinAndSelect('movimiento.cuenta', 'cuenta')
      .leftJoinAndSelect('cuenta.cliente', 'cliente')
      .where('cliente.id = :clienteId', { clienteId })
      .orderBy('movimiento.fecha', 'DESC') // 🔥 Ordenado de más reciente a más antiguo
      .getOne();

    if (!movimiento) {
      throw new NotFoundException(`No se encontró movimiento para el cliente con ID ${clienteId}`);
    }

    return movimiento;
  }

  // ✅ Método mejorado para buscar con filtros
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
      query.andWhere('LOWER(movimiento.tipo) = LOWER(:tipo)', { tipo });
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
