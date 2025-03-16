import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { CuentaModule } from './cuenta/cuenta.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { Cliente } from './entities/cliente/cliente.entity';
import { Cuenta } from './entities/cuenta/cuenta.entity';
import { Movimiento } from './entities/movimiento/movimiento.entity';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const parseDatabaseUrl = (databaseUrl: string): DatabaseConfig => {
  const url = new URL(databaseUrl);
  return {
    host: url.hostname,
    port: Number(url.port) || 5432, // Puerto por defecto de PostgreSQL
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1),
  };
};

const dbConfig: DatabaseConfig | null = process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : null;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig?.host || process.env.DB_HOST,
      port: dbConfig?.port || Number(process.env.DB_PORT) || 5432,
      username: dbConfig?.username || process.env.DB_USER,
      password: dbConfig?.password || process.env.DB_PASSWORD,
      database: dbConfig?.database || process.env.DB_NAME,
      entities: [Cliente, Cuenta, Movimiento],
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    }),
    ClienteModule,
    CuentaModule,
    MovimientoModule,
  ],
})
export class AppModule {}
