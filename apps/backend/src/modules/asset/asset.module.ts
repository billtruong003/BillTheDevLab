import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetSecurityService } from './asset-security.service';
import { AssetController } from './asset.controller';
import { Product, Purchase } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Purchase])],
  controllers: [AssetController],
  providers: [AssetSecurityService],
  exports: [AssetSecurityService],
})
export class AssetModule {}
