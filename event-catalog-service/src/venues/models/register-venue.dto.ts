import { ApiProperty } from "@nestjs/swagger";



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

}