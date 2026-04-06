import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('GatewayBootstrap');

  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
 app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );
  await app.listen(envConfig.PORT, () => {
    logger.log(`Gateway is running on port ${envConfig.PORT}`);
  });
}
bootstrap();
