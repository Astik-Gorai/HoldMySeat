import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "../../events/models/constants";


export class ShowsFilterDto{
    @ApiProperty({
        required: false
    })
    status: string

    @ApiProperty({
        required: false
    })
    city: string

    @ApiProperty({
        required: false
    })
    event_type: EventType

    @ApiProperty({
        required: false
    })
    event_id: string
}