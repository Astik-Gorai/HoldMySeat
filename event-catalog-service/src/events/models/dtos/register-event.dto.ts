import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "../constants";


export class RegisterEventDto{
    @ApiProperty()
    event_name: string

    @ApiProperty()
    event_type: EventType

    @ApiProperty()
    description: string

    @ApiProperty()
    organizer_id:string
    
}
