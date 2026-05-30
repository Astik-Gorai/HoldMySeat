import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuesEntity } from './models/venues.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VenuesEntity])
  ],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
