import { ApiProperty } from "@nestjs/swagger";
import { EventStatus, EventType } from "../constants";


export class FetchEventFilterDto{

    @ApiProperty({
        required: false
    })
    id: string
    
    @ApiProperty({
        required: false
    })
    event_name: string

    @ApiProperty({
        required: false
    })
    event_type: EventType

    @ApiProperty({
        required: false
    })
    event_status: EventStatus

    @ApiProperty({
        required: false
    })
    organizer_id: string

    @ApiProperty({
        required: false
    })
    sortByDate: boolean

    @ApiProperty({
        required: false
    })
    event_location: string
}