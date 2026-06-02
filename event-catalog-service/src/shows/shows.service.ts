import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterShowDto } from './models/register-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventShowEntity } from './models/event_show.entity';
import { DataSource, Repository } from 'typeorm';
import { EventEntity } from '../events/models/entities/event.entity';
import { VenuesEntity } from '../venues/models/venues.entity';
import { ShowsFilterDto } from './models/show-filter.dto';
import { ClientProxy } from '@nestjs/microservices';
import { VenueSeatsEntity } from '../venues/models/venue-seats.entity';
import { ShowStatus } from '../events/models/constants';

@Injectable()
export class ShowsService {
  constructor(
    @Inject('INVENTORY_SERVICE') private inventoryClient: ClientProxy,
    @InjectRepository(EventShowEntity)
    private readonly showRepository: Repository<EventShowEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(VenuesEntity)
    private readonly venueRepository: Repository<VenuesEntity>,
    @InjectRepository(VenueSeatsEntity) private readonly venueSeatsRepo: Repository<VenueSeatsEntity>,
    private readonly dataSource: DataSource,
    
  ) {}
  async registerShow(showData: RegisterShowDto) {
    try {
      const event = await this.eventRepository.findOne({
        where: {
          id: showData.eventId,
        },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const venue = await this.venueRepository.findOne({
        where: {
          id: showData.venueId,
        },
      });

      if (!venue) {
        throw new NotFoundException('Venue not found');
      }

      const show = this.showRepository.create({
        event,
        venue,
        totalSeats: showData.totalSeats,
        availableSeats: showData.totalSeats,
        specialNotes: showData.specialNotes,
        basePrice: showData.basePrice,
        startTime: showData.startTime,
        endTime: showData.endTime,
      });

      const venueSeats = await this.venueSeatsRepo.find({
        where:{
            venue: {id: showData.venueId}
        }
      })

      await this.showRepository.save(show);
      this.inventoryClient.emit('show.created', {
        showId: show.id,
        venueSeats,
      });
    } catch (err) {
      // this.handleErr(err, 'Error while registering the show')
      if (err instanceof HttpException) return err;
      throw new Error('Error while registering the show' + ' ' + err.message);
    }
  }

  async cancelShow(showId: string) {
    try {
      const show = await this.showRepository.findOne({
        where: {id: showId}
      });
      if(!show) {
        throw new NotFoundException('Show not found');
      }
      show.status = ShowStatus.CANCELLED;
      await this.showRepository.save(show);
      this.inventoryClient.emit('show.cancelled', {
        showId: show.id,
      });
      return {message: 'Show cancelled successfully'};
    } catch (err) {
      if (err instanceof HttpException) return err;
      throw new Error('Error while cancelling the show' + ' ' + err.message);
    }
  }

  async getShowsForEvent(filterData: ShowsFilterDto) {}

  private handleErr(err, custom_msg) {
    if (err instanceof HttpException) return err;
    throw new Error(custom_msg + ' ' + err.message);
  }
}
