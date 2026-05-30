import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterShowDto } from './models/register-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventShowEntity } from './models/event_show.entity';
import { DataSource, Repository } from 'typeorm';
import { EventEntity } from '../events/models/entities/event.entity';
import { VenuesEntity } from '../venues/models/venues.entity';
import { ShowsFilterDto } from './models/show-filter.dto';

@Injectable()
export class ShowsService {

    constructor(
        @InjectRepository(EventShowEntity) private readonly showRepository : Repository<EventShowEntity>,
        @InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
        @InjectRepository(VenuesEntity) private readonly venueRepository: Repository<VenuesEntity>,
        private readonly dataSource: DataSource
    ){}
    async registerShow(showData: RegisterShowDto){
        try{
            const event = await this.eventRepository.findOne({
                where: {
                    id: showData.eventId
                }
            });
            
            if (!event) {
                throw new NotFoundException('Event not found');
            }
            
            const venue = await this.venueRepository.findOne({
                where: {
                    id: showData.venueId
                }
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
            
            await this.showRepository.save(show);
        }catch(err){
            // this.handleErr(err, 'Error while registering the show')
            if(err instanceof HttpException) return err;
        throw new Error('Error while registering the show'+ " "+err.message)
        }
    }

   async getShowsForEvent(filterData: ShowsFilterDto){

    }

    private handleErr(err,custom_msg){
        if(err instanceof HttpException) return err;
        throw new Error(custom_msg+ " "+err.message)
    }
}
