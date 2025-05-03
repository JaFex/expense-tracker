import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

// TODO: Add validation to this dto

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
