import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { config } from 'dotenv';

 
config();

export default defineConfig({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  entities: ["./dist/**/*.entity.(ts|js)"],
  entitiesTs: ["./src/**/*.entity.ts"],
  dbName: process.env.DB_NAME,
  driver: PostgreSqlDriver,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: process.env.DB_DEBUG === 'true',
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
  seeder: {
    path: 'src/seeds',
    defaultSeeder: 'DatabaseSeeder',
  },
});