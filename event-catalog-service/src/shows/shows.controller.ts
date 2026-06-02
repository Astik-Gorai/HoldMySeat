import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { RegisterShowDto } from './models/register-show.dto';
import { ShowsFilterDto } from './models/show-filter.dto';
import { Payload } from '@nestjs/microservices';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post('register-show')
  async registerShow(@Body() showData: RegisterShowDto){
    return await this.showsService.registerShow(showData);
  }

  @Post('cancel-show')
  async cancelShow(@Body() payload: {showId: string}){
    return await this.showsService.cancelShow(payload.showId);
  }

  @Get('get-shows')
  async getShowsForEvent(@Query() filterData: ShowsFilterDto){
    return await this.showsService.getShowsForEvent(filterData);
  }
  
}
