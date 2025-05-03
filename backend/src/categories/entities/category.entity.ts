import { Entity, Enum, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { FlowType } from "../../common/enums";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { v4 } from "uuid";
import { UpdateCategoryDto } from "../dto/update-category.dto";

// TODO: create a base entity from whjere all this new entities will extend

@Entity()
export class Category {

    @PrimaryKey({ hidden: true })
    id: number;

    @Property()
    @Unique()
    $id: string = v4();

    @Property()
    name!: string;

    @Property()
    description?: string;

    @Enum(() => FlowType)
    type!: FlowType;

    constructor({ name, description, type }: CreateCategoryDto) {
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
