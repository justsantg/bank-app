import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movimientoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientoService.update(id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movimientoService.remove(id);
  }

  @Get('ultimo/:clienteId')
async obtenerUltimoMovimiento(@Param('clienteId') clienteId: number) {
  if (!clienteId) {
    throw new BadRequestException('❌ Error: clienteId no puede ser null');
  }
  return this.movimientoService.findUltimoMovimiento(clienteId);
}



  // Endpoint existente para buscar movimientos con filtros
  @Get('cuenta/:cuentaId')
  findWithFilters(
    @Param('cuentaId') cuentaId: number,
    @Query('tipo') tipo?: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('orden') orden?: 'ASC' | 'DESC',
  ) {
    return this.movimientoService.findWithFilters(cuentaId, tipo, fechaInicio, fechaFin, orden);
  }
}
