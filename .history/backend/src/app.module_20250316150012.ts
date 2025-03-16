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
      url: process.env.DATABASE_URL, // ✅ Usa la variable de Railway
      autoLoadEntities: true,
      synchronize: true, // 🔥 Solo para desarrollo, desactívalo en producción
      ssl: {
        rejectUnauthorized: false, // 🚨 Importante para evitar errores SSL en Railway
      },
    }),
    ClienteModule,
    CuentaModule,
    MovimientoModule,
  ],
})
export class AppModule {}
