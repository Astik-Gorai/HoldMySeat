import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventShowEntity } from "../../shows/models/event_show.entity";
import { VenueSeatsEntity } from "./venue-seats.entity";



@Entity('venues')
export class VenuesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name:string

    @Column()
    city: string

    @Column('text')
    address: string

    @Column({
        default: 0
    })
    capacity:number

    @Column({
        name: 'pin_code'
    })
    pinCode:number

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date

    @OneToMany(() => VenueSeatsEntity, (seat) => seat.venue)
    seats: VenueSeatsEntity[];

    @OneToMany(()=>EventShowEntity,(eventShow)=>eventShow.venue)
    shows: EventShowEntity[]
}