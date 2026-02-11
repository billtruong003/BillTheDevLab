import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { PostStatus, PostLayout } from '@billthedevlab/shared-types';
import { Product } from './product.entity';
import { ViewLog } from './view-log.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'varchar' })
  @Index()
  slug!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'mdx_file_path', type: 'varchar' })
  mdxFilePath!: string;

  @Column({ name: 'cover_image', type: 'varchar', nullable: true })
  coverImage!: string | null;

  @Column('text', { array: true, default: '{}' })
  tags!: string[];

  @Column({ type: 'enum', enum: PostLayout, default: PostLayout.FULL_WIDTH })
  layout!: PostLayout;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  @Index()
  status!: PostStatus;

  @Column({ default: 0 })
  views!: number;

  @Column({ default: 0 })
  likes!: number;

  @Column({ name: 'estimated_read_time', default: 5 })
  estimatedReadTime!: number;

  @Column({ default: false })
  featured!: boolean;

  @Column({ name: 'project_slug', type: 'varchar', nullable: true })
  projectSlug!: string | null;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt!: Date | null;

  @OneToMany(() => Product, (product) => product.post)
  products!: Product[];

  @OneToMany(() => ViewLog, (viewLog) => viewLog.post)
  viewLogs!: ViewLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
