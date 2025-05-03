import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { CategorySeeder } from '../categories/seeds/categories.seed';


export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        await this.call(em, [CategorySeeder]);
    }
}
