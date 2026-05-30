import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "../../events/models/entities/event.entity";
import { VenuesEntity } from "../../venues/models/venues.entity";
import { ShowStatus } from "../../events/models/constants";



@Entity('shows')
export class EventShowEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(()=>EventEntity,(event)=>event.shows)
    event: EventEntity

     
    @ManyToOne(()=>VenuesEntity, (venueEntity)=> venueEntity.shows)
    venue: VenuesEntity

    @Column({
        name: 'total_seats',
        default: 0
    })
    totalSeats: number

    @Column({
        name: 'available_seats',
        default: 0
    })
    availableSeats: number

    @Column({
        type: 'enum',
        enum: ShowStatus,
        default: ShowStatus.PENDING,
    })
    status: ShowStatus

    @Column({
        name: 'special_notes',
        nullable: true,
        type: 'text'
    })
    specialNotes: string

    @Column({
        name: 'base_price'
    })
    basePrice: number

    @Column({
        name: 'start_time'
    })
    startTime: Date

    @Column({
        name: 'end_time'
    })
    endTime: Date
}