
CREATE TABLE "users" (
	"id" integer PRIMARY KEY,
	"name" text,
	"email" TEXT,
	"passwordhash" TEXT,
	"created_date" timestamp with time zone,
	"updated_date" timestamp with time zone,
);
