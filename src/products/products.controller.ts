import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { productService } from '../config';
import { PaginationDto } from '../common';
import { CreateProductDto, UpdateProductDto } from './dto/index';

@Controller('products')
export class ProductsController {
  constructor(@Inject(productService) private readonly productsClient: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto)
    .pipe( 
      catchError(err => {
        throw new RpcException(err);
      })
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
    .pipe( 
      catchError(err => {
        throw new RpcException(err);
      })
    );
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto })
    .pipe( 
      catchError(err => {
        throw new RpcException(err);
      })
    );;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id })
    .pipe( 
      catchError(err => {
        throw new RpcException(err);
      })
    );
  }
}
