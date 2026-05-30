import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/entities/event.entity';
import { Repository } from 'typeorm';
import { RegisterEventDto } from './models/dtos/register-event.dto';
import { EventStatus, EventType } from './models/constants';
import { FetchEventFilterDto } from './models/dtos/fetch-event-filter.dto';
import { EventShowEntity } from '../shows/models/event_show.entity';
import { VenuesEntity } from '../venues/models/venues.entity';

interface FilterObjInterface{
    name?: string
    type?: EventType
    id?: string
    status?: EventStatus
    organizer_id?: string
    location?: string
}

@Injectable()
export class EventsService {
    constructor(@InjectRepository(EventEntity) private readonly evenRepo: Repository<EventEntity>,
    @InjectRepository(VenuesEntity) private readonly venueRepo: Repository<VenuesEntity>,
    @InjectRepository(EventShowEntity) private readonly showRepo: Repository<EventShowEntity>,
){}

    async registerEvent(eventData: RegisterEventDto){
        try{
            const event = await this.evenRepo.create({
                name: eventData.event_name,
                type: eventData.event_type,
                description: eventData.description,
                organizer_id: eventData.organizer_id
            })

            await this.evenRepo.save(event);

        }catch(err){
            if(err instanceof HttpException)
                return err;
            throw new Error(`Error while registering the event ${eventData.event_name}: ${err.message}`)
        }
    }

    async updateEventStatus(status: EventStatus, event_id: string){
        try{
            const event = await this.evenRepo.findOne({
                where: {
                    id: event_id
                }
            })
            if(!event)
                throw NotFoundException;
            event.status = status;
            await this.evenRepo.save(event);
        return {message: 'event status has been updated successfully'}
        }catch(err){
            if(err instanceof HttpException)
                return HttpException;
            throw new Error(`Error while updating the status of the event: ${err.message}`)
        }
    }

    async getEvents(filterData:FetchEventFilterDto){
        console.log("Filter data received at the service: ", filterData)

       
        // console.log("Events After Join: ", events)
        // console.log(filterData.id)
        try{
            const query = this.evenRepo.createQueryBuilder('events')
            .leftJoinAndSelect('events.shows', 'shows')
            .leftJoinAndSelect('shows.venue', 'venues')
            .select([
                'events.id',          //  include main entity ID
                'events.name',
                'events.type',
                'events.status',
                'events.organizer_id',
                
                'shows.id',           // include joined entity ID
                // 'shows.totalSeats',
                // 'shows.availableSeats',
                'shows.status',
                // 'shows.basePrice',
                
                'venues.id',          // include deeply joined entity ID
                'venues.name',
                'venues.city',
                'venues.address',
              ]);
            if(filterData?.event_name){
                query.andWhere('events.name = :name', { name: filterData.event_name })
            }
            if(filterData?.event_type){
                query.andWhere('events.type = :type', { type: filterData.event_type })
            }
            if(filterData?.event_status){
                query.andWhere('events.status = :status', { status: filterData.event_status })
            }
            if(filterData?.id){
                query.andWhere('events.id = :id', { id: filterData.id })
            }
            if(filterData?.organizer_id){
                query.andWhere('events.organizer_id = :organizer_id', { organizer_id: filterData.organizer_id })
            }
            if(filterData?.event_location){
                query.andWhere('venues.city = :location', { location: filterData.event_location })
            }
            query.orderBy('events.createdAt', 'ASC')


            const events = await query.getMany(); 

            // const events = await this.evenRepo.find({
            //     ...filter,
            //     order: {
            //         createdAt: 'ASC'
            //     }
            // })
            // if(filterData.sortByDate){
            //     events.sort()
            // }
            return events;

        }catch(err){
            return this.handleErr(err, 'Error while fetching the events');
        }
    }
    private handleErr(err,custom_msg){
        if(err instanceof HttpException)
            return err;
        throw new Error(custom_msg+ " "+err.message)
    }
    
}
