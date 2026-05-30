import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatInitDto } from './models/seats.init.dto';
import { SeatsStatusUpdateDto } from './models/seats-status-update.dto';

@Controller()
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {

  }

  @Post('init-seats')
  async initializeSeats(@Body() seatInitPayload:SeatInitDto){
    return await this.seatsService.initializeSeats(seatInitPayload)
  }

  // Get Seat HeatMap
  @Get('show/:showId/seats')
  async getShowHeatMap(@Param('showId') showId: string){
    return await this.seatsService.getShowHeatMap(showId);
  }

  @Post('hold-seats')
  async holdSeats(@Body() seatHoldPayload : SeatsStatusUpdateDto){
    return await this.seatsService.editStatusSeat(seatHoldPayload)
  }
}
