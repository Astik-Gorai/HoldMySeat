import { ApiProperty } from "@nestjs/swagger";

export class VenueSeatsDto{

    @ApiProperty()
    seat_label: string

    @ApiProperty()
    x_position: number

    @ApiProperty()
    y_position: number
}

export class RegisterVenueDto{

    @ApiProperty()
    venue_name: string

    @ApiProperty()
    city_name: string

    @ApiProperty()
    venue_address: string

    @ApiProperty({
        maxLength: 6,
        minLength: 6
    })
    pin_code: number

    @ApiProperty()
    capacity: number

    @ApiProperty({ type: [VenueSeatsDto] })
    seats: VenueSeatsDto[]

}