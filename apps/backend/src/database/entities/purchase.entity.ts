import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PurchaseStatus } from '@billthedevlab/shared-types';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId!: string;


  @Column({ name: 'product_id', type: 'uuid' })
  @Index()
  productId!: string;

  @Column({ name: 'amount_paid', type: 'decimal', precision: 10, scale: 2 })
  amountPaid!: number;

  @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.PENDING })
  status!: PurchaseStatus;


  @Column({ name: 'stripe_session_id', type: 'varchar', nullable: true })
  stripeSessionId!: string | null;

  @Column({ name: 'download_count', default: 0 })
  downloadCount!: number;

  @Column({ name: 'last_downloaded_at', type: 'timestamptz', nullable: true })
  lastDownloadedAt!: Date | null;

  @ManyToOne(() => User, (user) => user.purchases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.purchases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
