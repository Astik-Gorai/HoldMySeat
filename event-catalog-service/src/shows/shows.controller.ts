import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { RegisterShowDto } from './models/register-show.dto';
import { ShowsFilterDto } from './models/show-filter.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post('register-show')
  async registerShow(@Body() showData: RegisterShowDto){
    return await this.showsService.registerShow(showData);
  }

  @Get('get-shows')
  async getShowsForEvent(@Query() filterData: ShowsFilterDto){
    return await this.showsService.getShowsForEvent(filterData);
  }
  
}
