import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../events/models/entities/event.entity';
import { EventShowEntity } from './models/event_show.entity';
import { VenuesEntity } from '../venues/models/venues.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VenuesEntity,EventEntity, EventShowEntity])
  ],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
