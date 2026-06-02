import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SeatsService } from '../seats/seats.service';

@Controller()
export class InventoryConsumer {
  constructor(private readonly seatsService: SeatsService) {}
  @EventPattern('show.created')
  async handleShowCreated(@Payload() data: any) {
    // console.log('Received:', data);
    await this.seatsService.initializeSeats(data);
    return {message: 'Seats initialized successfully'}
  }

  @EventPattern('show.cancelled')
  async handleShowCancelled(@Payload() data: any) {
    await this.seatsService.cancelShowSeats(data.showId);
    return {message: 'Show Seats Cancelled successfully'}
  }
}
