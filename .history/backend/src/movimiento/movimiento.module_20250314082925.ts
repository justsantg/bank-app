import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from '../entities/movimiento/movimiento.entity';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movimiento])],
  controllers: [MovimientoController],
  providers: [MovimientoService],
})
export class MovimientoModule {}
