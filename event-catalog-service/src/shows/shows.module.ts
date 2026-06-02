import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../events/models/entities/event.entity';
import { EventShowEntity } from './models/event_show.entity';
import { VenuesEntity } from '../venues/models/venues.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VenueSeatsEntity } from '../venues/models/venue-seats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VenuesEntity,EventEntity, EventShowEntity,VenueSeatsEntity]),
      ClientsModule.register([
        {
          name: 'INVENTORY_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'inventory_queue',
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
  ],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
