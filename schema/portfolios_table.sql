
CREATE TABLE "portfolios" (
	"id" integer PRIMARY KEY,
	"user_id" integer references users,
	"name" text NOT NULL,
	"created_date" timestamp with time zone,
	"updated_date" timestamp with time zone	UPDATED_DATE,
);
