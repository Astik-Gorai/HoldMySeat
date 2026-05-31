import { ApiProperty } from "@nestjs/swagger";
import { SeatStatusEnum } from "./seats-status.enum";


export class SeatsStatusUpdateDto{
    @ApiProperty({
        required: true
    })
    showId: string

    @ApiProperty({
        required: true
    })
    userId: string

    @ApiProperty({
        
    })
    newStatus: SeatStatusEnum

    @ApiProperty({
        default: []
    })
    seatIds: []
}