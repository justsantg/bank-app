import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Cuenta } from 'src/entities/cuenta/cuenta.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
  ) {}

  async create(createCuentaDto: CreateCuentaDto): Promise<Cuenta> {
    if (!createCuentaDto.clienteId) {
      throw new BadRequestException('Cada cuenta debe estar asociada a un cliente.');
    }
    
    const cuenta = this.cuentaRepository.create(createCuentaDto);
    return this.cuentaRepository.save(cuenta);
  }

  findAll(): Promise<Cuenta[]> {
    return this.cuentaRepository.find({
      relations: ['cliente'],
      where: { cliente: { id: Not(IsNull()) } } // 🔥 Excluir cuentas sin cliente
    });
  }
  

  findOne(id: number) {
    return this.cuentaRepository.findOne({ where: { id }, relations: ['cliente'] });
  }

  async update(id: number, updateCuentaDto: UpdateCuentaDto) {
    await this.cuentaRepository.update(id, updateCuentaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cuentaRepository.delete(id);
  }
}
