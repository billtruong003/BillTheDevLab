import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProductType } from '@billthedevlab/shared-types';
import { Post } from './post.entity';
import { Purchase } from './purchase.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'varchar', default: 'USD' })
  currency!: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.ASSET })
  type!: ProductType;

  @Column({ name: 'file_key', type: 'varchar', nullable: true })
  fileKey!: string | null;

  @Column({ name: 'thumbnail_url', type: 'varchar', nullable: true })
  thumbnailUrl!: string | null;

  @Column({ name: 'file_size_bytes', type: 'bigint', default: 0 })
  fileSizeBytes!: number;

  @Column({ name: 'stripe_price_id', type: 'varchar', nullable: true })
  stripePriceId!: string | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'post_id', type: 'uuid', nullable: true })
  postId!: string | null;

  @ManyToOne(() => Post, (post) => post.products, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'post_id' })
  post!: Post | null;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases!: Purchase[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
