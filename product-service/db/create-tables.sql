CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY key DEFAULT uuid_generate_v4(),
  title TEXT NOT null,
  description TEXT,
  price INTEGER,
  image TEXT
);

COMMIT;

CREATE TABLE IF NOT EXISTS stocks (
  product_id uuid,
  FOREIGN key(product_id) REFERENCES "products" ("id"),
  count INTEGER
);
