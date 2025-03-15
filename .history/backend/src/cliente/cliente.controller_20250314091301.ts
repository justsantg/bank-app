import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id/cuentas')
  getCuentasPorCliente(@Param('id') id: number) {
    return this.clienteService.getCuentasPorCliente(id);
  }
}
