import { ApiProperty } from "@nestjs/swagger";

export class VenueSeatDto {
    @ApiProperty({ example: 'seat-123', description: 'The unique ID of the seat' })
    id: string;
  
    @ApiProperty({ example: 10, description: 'X coordinate on the map' })
    xPosition: number;
  
    @ApiProperty({ example: 5, description: 'Y coordinate on the map' })
    yPosition: number;
  
    @ApiProperty({ example: 'Row A - Seat 5', description: 'The display label for the seat' })
    seatLabel: string;
  }

export class SeatEntityDto{
    @ApiProperty({
        required: true
    })
    venue_seat_id: string

    @ApiProperty({
        required: false
    })
    hold_by: string

    @ApiProperty({
        required: false
    })
    hold_until: Date
}

export class SeatInitDto{
    @ApiProperty({
        required: true
    })
    showId: string

    @ApiProperty({
        type: [VenueSeatDto], // Tells Swagger it's an array of these objects
        required: true,
        description: 'List of seats assigned to this venue'
      })
      venueSeats: VenueSeatDto[];

    // @ApiProperty({
    //     required:true
    // })
    // venue_id:string

    // @ApiProperty({
    //     required: true
    // })
    // seats: SeatEntityDto[]
}