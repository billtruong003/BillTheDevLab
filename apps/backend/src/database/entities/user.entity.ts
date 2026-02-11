import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '@billthedevlab/shared-types';
import { Purchase } from './purchase.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'display_name' })
  displayName!: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl!: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VISITOR })
  role!: UserRole;

  @Column({ name: 'stripe_customer_id', nullable: true })
  stripeCustomerId!: string | null;

  @Column({ name: 'is_subscribed', default: false })
  isSubscribed!: boolean;

  @Column({ name: 'subscription_expires_at', type: 'timestamptz', nullable: true })
  subscriptionExpiresAt!: Date | null;

  @Column({ nullable: true })
  provider!: string | null;

  @Column({ name: 'provider_id', nullable: true })
  providerId!: string | null;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases!: Purchase[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
