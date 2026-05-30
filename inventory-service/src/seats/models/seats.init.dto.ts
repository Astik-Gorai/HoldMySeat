import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";


export class SeatEntityDto{
    @ApiProperty()
    x_pos: number

    @ApiProperty()
    y_pos: number

    @ApiProperty()
    seat_label: string

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
        required: true
    })
    seats: SeatEntityDto[]
}