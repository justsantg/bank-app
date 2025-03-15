import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/entities/cliente/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find({
      relations: ['cuentas'], // 🔥 Incluir las cuentas del cliente
    });
  }

  async getCuentasYMovimientosPorCliente(id: number) {
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['cuentas', 'cuentas.movimientos'],
    });
  }
  
}
