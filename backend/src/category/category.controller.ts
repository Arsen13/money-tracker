import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Body() createCategoryDto: CreateCategoryDto, 
        @Req() req
    ) {
        return this.categoryService.create(createCategoryDto, +req.user.id);
    }
}