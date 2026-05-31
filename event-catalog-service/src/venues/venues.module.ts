import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuesEntity } from './models/venues.entity';
import { VenueSeatsEntity } from './models/venue-seats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VenuesEntity,VenueSeatsEntity])
  ],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
