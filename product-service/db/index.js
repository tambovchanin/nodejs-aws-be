import DbError from '../common/DbError';
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

export const getProducts = async event => {
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
