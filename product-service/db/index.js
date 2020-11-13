import DbError from '../common/DbError';
import ValidationError from '../common/ValidationError';
import { Client } from 'pg';

const {
  PG_USER,
  PG_PASS,
  PG_DATABASE,
  PG_INSTANCE,
  PG_PORT
} = process.env;

const dbOptions = {
  host: PG_INSTANCE,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASS,
  ssl: {
      rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

export const getProducts = async () => {
  const client = new Client(dbOptions);

  try {
    await client.connect();
  } catch (err) {
    console.error(err);
    throw new DbError(err.message);
  }

  const query = `
    SELECT id, title, price, description, image, count FROM products p
    JOIN stocks s ON s.product_id = p.id
  `;

  console.log('SQL Query', query);

  try {
    const { rows: items } = await client.query(query);

    console.log(items);

    return items;
  } catch (err) {
    console.error(err);
    throw new DbError(err.message);
  } finally {
    client.end();
  }
}

export const getProductById = async (id) => {
  const client = new Client(dbOptions);

  const query = `
    SELECT id, title, price, description, image, count FROM products p
    JOIN stocks s ON s.product_id = p.id
    WHERE p.id = $1
  `;

  console.log('SQL Query', query, [id]);

  try {
    await client.connect();
  } catch (err) {
    console.error(err);
    throw new DbError(err.message);
  }

  try {
    const { rows: items } = await client.query(query, [id]);

    console.log(items);

    return items;
  } catch (err) {
    console.error(err);
    throw new DbError(err.message);
  } finally {
    client.end();
  }
}

export const addProduct = async (data) => {
  const client = new Client(dbOptions);

  let product;

  try {
    product = JSON.parse(data);
  } catch (err) {
    throw new ValidationError(`Can't parser product data {${data}}`);
  }

  const {
    title,
    description,
    price,
    image,
    stock
  } = product;

  try {
    await client.connect();
  } catch (err) {
    console.error(err);
    throw new DbError(err.message);
  }

  try {
    await client.query('BEGIN');
    const insertProductQuery = 'INSERT INTO products (title, price, description, image) VALUES ($1, $2, $3, $4) RETURNING id';

    console.log('SQL Insert Product', insertProductQuery, [title, price, description, image]);

    const res = await client.query(insertProductQuery, [title, price, description, image]);

    console.log('Res', res);

    const [ entry ] = res.rows;
    const insertStockQuery = 'INSERT INTO stocks (product_id, count) VALUES ($1, $2)';

    console.log('SQL Insert Stock', insertStockQuery, [entry.id, stock]);

    await client.query(insertStockQuery, [entry.id, stock]);
    await client.query('COMMIT')

    return {
      ...entry,
      title,
      description,
      price,
      image,
      stock,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    throw new DbError(err.message);
  } finally {
    client.end();
  }
}
