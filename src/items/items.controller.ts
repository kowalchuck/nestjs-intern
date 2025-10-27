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
import { ItemsService } from './items.service';
import { Item as ItemModel, Prisma } from 'generated/prisma';
import { ProductBaseDto } from './dto/product.base.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  getHomepageItems() {}

  @Get('/filtered')
  getItemsByFilters(
    @Body() itemFilters: Prisma.ItemWhereInput,
  ): Promise<ItemModel[] | null> {
    return this.itemService.items({ ...itemFilters });
  }

  @Get('/:id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<ItemModel | null> {
    return this.itemService.item({ id });
  }

  @Post()
  createItem(@Body() itemData: ProductBaseDto): Promise<ItemModel> {
    return this.itemService.createItem({ ...itemData });
  }

  @Patch('/:id')
  updateItem(
    @Body() itemData: ProductBaseDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ItemModel | null> {
    return this.itemService.updateItem({ ...itemData }, { id });
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<ItemModel | null> {
    return this.itemService.deleteItem({ id });
  }
}
