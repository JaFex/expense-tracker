import { Entity, Enum, Property } from "@mikro-orm/core";
import { FlowType } from "../../common/enums";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity()
export class Category extends BaseEntity<UpdateCategoryDto> {

    @Property()
    name!: string;

    @Property()
    description?: string;

    @Enum(() => FlowType)
    type!: FlowType;

    constructor({ name, description, type }: CreateCategoryDto) {
        super();
        this.name = name;
        this.description = description;
        this.type = type;
    }

    update({ name, description, type }: UpdateCategoryDto) {
        this.name = name ?? this.name;
        this.description = description ?? this.description;
        this.type = type ?? this.type;
    }
}
