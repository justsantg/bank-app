import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { CuentaModule } from './cuenta/cuenta.module';
import { MovimientoModule } from './movimiento/movimiento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // ✅ Usa la URL de Railway
      autoLoadEntities: true, // Carga las entidades automáticamente
      synchronize: true, // ⚠️ Solo para desarrollo, desactívalo en producción
      ssl: false, // ❌ Desactiva SSL porque Railway no lo necesita
    }),
    ClienteModule,
    CuentaModule,
    MovimientoModule,
  ],
})
export class AppModule {}
