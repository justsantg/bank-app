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

  // ✅ Nueva ruta para obtener cuentas y movimientos de un cliente
  @Get(':id/cuentas-movimientos')
  getCuentasYMovimientosPorCliente(@Param('id') id: number) {
    return this.clienteService.getCuentasYMovimientosPorCliente(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
  return this.clienteService.remove(id);
  }

}
