import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envConfig, productService } from '../config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: productService,
        transport: Transport.TCP,
        options: {
          host: envConfig.PRODUCTS_SERVICE_HOST,
          port: envConfig.PRODUCTS_SERVICE_PORT,
        },
      }
    ])
  ]
})
export class ProductsModule {}
