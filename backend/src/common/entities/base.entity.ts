import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ abstract: true })
export abstract class BaseEntity<T> {

    @PrimaryKey({ hidden: true })
    id: number;


    @Property()
    @Unique()
    $id = v4();

    @Property()
    created_at = new Date();

    @Property({ onUpdate: () => new Date() })
    updated_at = new Date();

    constructor() { }

    abstract update(data: T): void
}