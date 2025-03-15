import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from '../entities/cuenta/cuenta.entity';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}
