INSERT INTO products (id, title, price, description, image) VALUES
  ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Ракета "Подводник" 0266', 2.4, 'Short Product Description1', 'https://raketa.com/wp-content/uploads/2019/11/W-45-17-10-0266_1.jpg'),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'Раката "Байконур" 0247', 10, 'Short Product Description3', 'https://raketa.com/wp-content/uploads/2019/05/W-30-19-30-0247_cover.jpg'),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'Ракета "Полярные" 0258', 23, 'Short Product Description2', 'https://raketa.com/wp-content/uploads/2019/07/W-45-17-20-0258_5.jpg'),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'Ракета "Моряк" 0267', 15, 'Short Product Description7', 'https://raketa.com/wp-content/uploads/2019/11/W-50-17-10-0267_2.jpg'),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Ракета "Ту Изделие 80"', 23, 'Short Product Description2', 'https://raketa.com/wp-content/uploads/2019/12/w-45-17-10-0269-1-268x347.jpg'),
  ('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'Ракета "Амфибия" 0252', 15, 'Short Product Description4', 'https://raketa.com/wp-content/uploads/2019/05/W-85-16-20-0252_cover-1-268x347.jpg'),
  ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Ракета "Подводник" 0167', 23, 'Short Product Descriptio1', 'https://raketa.com/wp-content/uploads/2019/07/W-45-17-10-0167_4-1.jpg'),
  ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'Ракета "Моряк" 0218', 15, 'Short Product Description7', 'https://raketa.com/wp-content/uploads/2019/07/W-50-17-30-0218_1_.jpg');

COMMIT;

INSERT INTO stocks (product_id, count) VALUES
  ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 12),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 14),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 1),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 0),
  ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 12),
  ('7567ec4b-b10c-48c5-9345-fc73348a80a1', 8),
  ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 6),
  ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 4);
