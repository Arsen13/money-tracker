import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response.dto';
import { DeleteCategoryResponseDto } from './dto/delete-category-response.dto';

@ApiTags('Category')
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Used to create a new category' })
  @ApiCreatedResponse({
    description: 'Category created',
    type: CategoryResponseDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Used to find all categories' })
  @ApiCreatedResponse({
    description: 'Categories found',
    type: CategoryResponseDto,
    isArray: true,
  })
  @Get()
  findAll(@Req() req): Promise<Category[]> {
    return this.categoryService.findAll(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to find one category' })
  @ApiCreatedResponse({
    description: 'Category found',
    type: CategoryResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') categoryId: string, @Req() req): Promise<Category> {
    return this.categoryService.findOne(+req.user.id, +categoryId);
  }

  @ApiOperation({ summary: 'Used to update a category' })
  @ApiCreatedResponse({
    description: 'Category updated',
    type: CategoryResponseDto,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') categoryId: string,
    @Req() req,
  ): Promise<Category> {
    return this.categoryService.update(
      updateCategoryDto.title,
      +categoryId,
      +req.user.id,
    );
  }

  @ApiOperation({ summary: 'Used to delete a category' })
  @ApiCreatedResponse({
    description: 'Category deleted',
    type: DeleteCategoryResponseDto,
  })
  @Delete(':id')
  delete(@Param('id') categoryId: string, @Req() req) {
    return this.categoryService.remove(+categoryId, +req.user.id);
  }
}
