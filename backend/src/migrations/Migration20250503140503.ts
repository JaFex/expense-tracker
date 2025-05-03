import { Migration } from '@mikro-orm/migrations';

export class Migration20250503140503 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "category" ("id" serial primary key, "\$id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(255) null, "type" text check ("type" in ('I', 'E')) not null);`);
    this.addSql(`alter table "category" add constraint "category_\$id_unique" unique ("\$id");`);
  }

}
