CREATE TABLE "users" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid DEFAULT gen_random_uuid(),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
