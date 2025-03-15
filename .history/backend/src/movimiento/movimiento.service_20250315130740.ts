import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from 'src/entities/movimiento/movimiento.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
i

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
    if (!clienteId) {
      throw new BadRequestException('❌ Error: clienteId es inválido.');
    }
  
    const movimiento = await this.movimientoRepository.findOne({
      where: { cuenta: { cliente: { id: clienteId } } },
      relations: ['cuenta', 'cuenta.cliente'], // 🔥 Incluye cliente
      order: { fecha: 'DESC' }, // 🔥 Ordenado por fecha descendente
    });
  
    if (!movimiento) {
      throw new NotFoundException(`❌ No se encontró movimiento para el cliente con ID ${clienteId}`);
    }
  
    return movimiento;
  }
  
}
