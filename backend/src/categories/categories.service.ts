import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly em: EntityManager,
  ) { }

  private async getById(id: string) {
    const category = await this.categoryRepository.findOne({ $id: id });
    if (!category) throw new NotFoundException();
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);
    await this.em.persistAndFlush(category);
    return category;
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findOne(id: string) {
    return this.getById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.getById(id);
    category.update(updateCategoryDto);

    await this.em.flush();

    return category;
  }

  async remove(id: string) {
    const category = await this.getById(id);
    await this.em.removeAndFlush(category);
  }
}
