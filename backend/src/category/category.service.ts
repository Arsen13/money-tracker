import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "src/prisma.service";
import { Category } from "@prisma/client";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
        const isCategoryExist = await this.prisma.category.findFirst({
            where: {
                title: createCategoryDto.title,
                userId
            }
        })

        if (isCategoryExist) throw new BadRequestException('This category already exist');

        return await this.prisma.category.create({
            data: {
                title: createCategoryDto.title,
                userId,   
            }
        })
    }

    async findAll(userId: number): Promise<Category[]> {
        return await this.prisma.category.findMany({ where: { userId } })
    }

    async findOne(userId: number, categoryId: number): Promise<Category> {
        const category = await this.prisma.category.findFirst({
            where: {
               id: categoryId,
               userId 
            }
        });

        if (!category) throw new NotFoundException('Category not found');

        return category;
    }

    async update(title: string, categoryId: number, userId: number): Promise<Category> {
        const isCategoryExist = await this.prisma.category.findFirst({
            where: {
                id: categoryId
            }
        });

        if (!isCategoryExist) throw new NotFoundException('Category not found');
        if (userId != isCategoryExist.userId) throw new ForbiddenException("You can't update this category");

        return await this.prisma.category.update({
            where: {
                id: categoryId,
                userId,
            },
            data: {
                title
            }
        });
    }

    async remove(categoryId: number, userId: number) {
        const isCategoryExist = await this.prisma.category.findFirst({
            where: { id: categoryId },
        });

        if (!isCategoryExist) throw new NotFoundException('Category not found');
        if (userId != isCategoryExist.userId) throw new ForbiddenException("You can't delete this category");

        await this.prisma.category.delete({
            where: { id: categoryId },
        });

        return { message: "Category was successfully deleted" };
    }
}