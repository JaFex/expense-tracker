import { Factory, Seeder } from '@mikro-orm/seeder';
import { EntityData, EntityManager } from '@mikro-orm/core';
import { Category } from '../entities/category.entity';
import { FlowType } from '../../common/enums';
import { faker } from '@faker-js/faker';


class CategoryFactory extends Factory<Category> {
    model = Category;

    protected definition(input?: EntityData<Category>): EntityData<Category> {
        return {
            name: faker.word.sample(),
            type: faker.helpers.enumValue(FlowType),
            description: faker.helpers.maybe(() => faker.lorem.sentence()),
            ...input
        };
    }
}


export class CategorySeeder extends Seeder {
    run(em: EntityManager): void {
        new CategoryFactory(em).make(10);
    }
}
