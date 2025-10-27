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
import { CategoriesService } from './categories.service';
import { Category as CategoryModel } from 'generated/prisma';
import { CategoryBaseDto } from './dto/categories.base.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<CategoryModel[] | null> {
    return this.categoriesService.categories();
  }

  @Post()
  createCategory(@Body() categoryData: CategoryBaseDto) {
    return this.categoriesService.createCategory({ ...categoryData });
  }

  @Patch('/:id')
  updateCategory(
    @Body() categoryData: CategoryBaseDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryModel | null> {
    return this.categoriesService.updateCetegory({ ...categoryData }, { id });
  }

  @Delete('/:id')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryModel | null> {
    return this.categoriesService.deleteCategory({ id });
  }
}
