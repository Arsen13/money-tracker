import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Category } from "@prisma/client";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(
        @Body() createCategoryDto: CreateCategoryDto, 
        @Req() req
    ): Promise<Category> {
        return this.categoryService.create(createCategoryDto, +req.user.id);
    }

    @Get()
    findAll(@Req() req): Promise<Category[]> {
        return this.categoryService.findAll(+req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') categoryId: string, @Req() req): Promise<Category> {
        return this.categoryService.findOne(+req.user.id, +categoryId);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('id') categoryId: string,
        @Req() req
    ): Promise<Category> {
        return this.categoryService.update(updateCategoryDto.title, +categoryId, +req.user.id);
    }

    @Delete(':id')
    delete(@Param('id') categoryId: string, @Req() req) {
        return this.categoryService.remove(+categoryId, +req.user.id);
    }
}