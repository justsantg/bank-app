import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

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

  // Nuevo endpoint para buscar con filtros
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
