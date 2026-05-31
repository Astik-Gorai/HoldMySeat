import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { RegisterVenueDto } from './models/register-venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}


  @Post('register-venue')
  async registerVenue(@Body() venueData: RegisterVenueDto){
    return await this.venuesService.registerVenue(venueData);
  }

  @Delete('/delete-venue/:id')
  async deleteVenue(@Param('id') venue_id: string){
    return await this.venuesService.deleteVenue(venue_id);
  }

  @Get('/get-venue-seats/:id')
  async getVenueSeats(@Param('id') venue_id: string){
    return await this.venuesService.getVenueSeats(venue_id);
  }

  @Get('all-venues')
  async getAllVenues(){
    return await this.venuesService.getAllVenues();
  }
}
