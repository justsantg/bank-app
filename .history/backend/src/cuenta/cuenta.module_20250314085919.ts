@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}