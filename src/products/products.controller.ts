import { BadRequestException, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { productService } from '../config';
import { queryObjects } from 'v8';
import { PaginationDto } from '../common/dtos';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(productService) private readonly productsClient: ClientProxy) {}

  @Post()
  create() {
    return 'This action adds a new product';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log('Sending message to products service to find all products');
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'find_one_product' }, { id }));
      return product;
    } catch (error: any) {
      console.error('Error occurred while fetching product:', error);
      throw  new BadRequestException('Failed to fetch product. Please try again later.' + error.message);

    }
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'update_product' }, { id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id });
  }
}
