import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { RegisterVenueDto } from '../venues/models/register-venue.dto';
import { RegisterEventDto } from './models/dtos/register-event.dto';
import { FetchEventFilterDto } from './models/dtos/fetch-event-filter.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {
    
  }
  @Get('test')
  sayHI(){
    return "hi"
  }

  

  @Post('register-event')
  async registerEvent(@Body() eventData: RegisterEventDto){
    return await this.eventsService.registerEvent(eventData);
  }

  @Get('get-events')
  async getEvents( @Query() filterData: FetchEventFilterDto){
    console.log("Filter @Controller: ",filterData)
   return await this.eventsService.getEvents(filterData)
  }
}
