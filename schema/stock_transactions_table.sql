
CREATE TABLE "stock_transactions" (
	id integer PRIMARY KEY,
	portfolio_id integer references portfolios,
	"buy_date" timestamp with time zone,
	"sell_date" timestamp with time zone,
	"buy_price" money,
	"sell_price" money
);
