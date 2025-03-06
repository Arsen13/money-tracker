import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto, userId: number) {
        const isCategoryExist = await this.prisma.category.findUnique({
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
}