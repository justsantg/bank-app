import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return this.movimientoRepository.find({ relations: ['cuenta'] });
  }

  findOne(id: number) {
    return this.movimientoRepository.findOne({ where: { id }, relations: ['cuenta'] });
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    await this.movimientoRepository.update(id, updateMovimientoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.movimientoRepository.delete(id);
  }
}
