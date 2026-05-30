import { ApiProperty } from "@nestjs/swagger";

export class RegisterShowDto{

    @ApiProperty({
        
    })
    eventId: string

    @ApiProperty({
        
    })
    venueId: string

    @ApiProperty({
        
    })
    basePrice: number

    @ApiProperty({
        
    })
    totalSeats : number

    @ApiProperty({
        
        required: false,
        default: ''
    })
    specialNotes: string

    @ApiProperty({
       
    })
    startTime: Date

    @ApiProperty({
        
    })
    endTime:Date

}