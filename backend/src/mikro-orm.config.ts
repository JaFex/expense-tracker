import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';

// TODO: Move some of this strings to env vars
// TODO: create some seeds to populate inital data

export default defineConfig({
  host: 'localhost',
  port: 5432,
  entities: ["./dist/**/*.entity.(ts|js)"],
  entitiesTs: ["./src/**/*.entity.ts"],
  dbName: 'finance-dev',
  driver: PostgreSqlDriver,
  user: 'postgres',
  password: 'password',
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
});