import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product as ProductModel, Prisma } from 'generated/prisma';
import { ProductBaseDto } from './dto/product.base.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getHomepageItems() {}

  @Get('/filtered')
  getItemsByFilters(
    @Body() itemFilters: Prisma.ProductWhereInput,
  ): Promise<ProductModel[] | null> {
    return this.productsService.products({ ...itemFilters });
  }

  @Get('/:id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<ProductModel | null> {
    return this.productsService.product({ id });
  }

  @Post()
  createItem(@Body() itemData: ProductBaseDto): Promise<ProductModel> {
    return this.productsService.createProduct({ ...itemData });
  }

  @Patch('/:id')
  updateItem(
    @Body() itemData: ProductBaseDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductModel | null> {
    return this.productsService.updateProduct({ ...itemData }, { id });
  }

  @Delete('/:id')
  deleteItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductModel | null> {
    return this.productsService.deleteProduct({ id });
  }
}
