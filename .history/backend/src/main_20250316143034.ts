import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 🔥 Esto habilita CORS en todo el backend

  const port = process.env.PORT || 3000; // ✅ Usa el puerto asignado por Railway
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
