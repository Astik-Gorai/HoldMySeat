import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/entities/event.entity';
import { Repository } from 'typeorm';
import { RegisterEventDto } from './models/dtos/register-event.dto';
import { EventStatus, EventType } from './models/constants';
import { FetchEventFilterDto } from './models/dtos/fetch-event-filter.dto';

interface FilterObjInterface{
    name: string
    type: EventType
    id: string
    status: EventStatus
    organizer_id: string
}

@Injectable()
export class EventsService {
    constructor(@InjectRepository(EventEntity) private readonly evenRepo: Repository<EventEntity>,
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
        // console.log(filterData.id)
        try{
            const filter : Partial<FilterObjInterface> = {

            }
            if(filterData?.event_name){
                filter.name = filterData.event_name;
            }
            if(filterData?.event_type){
                filter.type = filterData.event_type
            }
            if(filterData?.event_status){
                filter.status = filterData.event_status
            }
            if(filterData?.id){
                filter.id = filterData.id
            }
            if(filterData?.organizer_id){
                filter.organizer_id = filterData.organizer_id
            }
            console.log("Filter:", filter)

            const events = await this.evenRepo.find({
                where: filter
            })
            if(filterData.sortByDate){
                events.sort()
            }
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
