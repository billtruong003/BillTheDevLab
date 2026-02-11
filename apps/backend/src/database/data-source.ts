import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Product } from './entities/product.entity';
import { Purchase } from './entities/purchase.entity';
import { ViewLog } from './entities/view-log.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'billthedevlab',
  entities: [User, Post, Product, Purchase, ViewLog],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
  logging: true,
});
