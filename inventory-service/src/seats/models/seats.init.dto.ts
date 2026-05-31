import { ApiProperty } from "@nestjs/swagger";


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
    show_id: string

    @ApiProperty({
        required:true
    })
    venue_id:string
    // @ApiProperty({
    //     required: true
    // })
    // seats: SeatEntityDto[]
}